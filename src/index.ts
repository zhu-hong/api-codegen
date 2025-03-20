import { writeFile, access, mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import type { SchemasObject } from 'openapi3-ts/oas30'
import {
	generateSchemasDefinition,
	generateComponentDefinition,
	generateParameterDefinition,
	kebab,
	RefComponentSuffix,
} from '@orval/core'
import {
	_effect_generateContextSpecs,
	_effect_getApiGenerate,
	_effect_getAllSchemas,
} from 'orval-effect'
import pLimit from 'p-limit'
import { execa } from 'execa'

type Config = {
	api_addresses: {
		definition: string
		address: string
	}[]
}

const IMPORT_HEAD = `import { _http } from '@/api/_http'`
const workspace = process.cwd()

async function readConfig(): Promise<Config> {
	const configFileRaw = await readFile(
		path.resolve(workspace, 'src/api', 'openapi_api.json'),
		'utf8',
	)
	return JSON.parse(configFileRaw) as Config
}

async function generateAPIFile({
	address,
	definition,
}: {
	definition: string
	address: string
}) {
	const contextSpecs = await _effect_generateContextSpecs({
		input: address,
		output: {
			target: path.resolve(workspace, 'src/api/'),
			mode: 'tags',
			override: {
				mutator: {
					path: path.resolve(workspace, 'src/api/_http.ts'),
					name: '_http',
				},
			},
		},
	})

	const [specKey, spec] = Object.entries(contextSpecs.specs)[0]

	const context = {
		output: contextSpecs.output,
		specKey,
		specs: contextSpecs.specs,
		target: contextSpecs.target,
		workspace: contextSpecs.workspace,
	}

	const parsedSchemas = spec.openapi
		? (spec.components?.schemas as SchemasObject)
		: _effect_getAllSchemas(spec, specKey)

	const schemasDefinition = generateSchemasDefinition(
		parsedSchemas,
		context,
		RefComponentSuffix.schemas,
	)
	const responseDefinition = generateComponentDefinition(
		spec.components?.responses,
		context,
		RefComponentSuffix.responses,
	)
	const bodyDefinition = generateComponentDefinition(
		spec.components?.requestBodies,
		context,
		RefComponentSuffix.requestBodies,
	)
	const parameters = generateParameterDefinition(
		spec.components?.parameters,
		context,
		RefComponentSuffix.parameters,
	)

	const outputDir = path.resolve(workspace, 'src/api', definition)

	// 建好文件夹
	await access(outputDir).catch(async () => {
		await mkdir(outputDir)
	})

	// 所有的通用模型（#/components/schemas）不分组写入一个文件
	await writeFile(
		path.resolve(outputDir, '_schemas.gen.ts'),
		[
			...schemasDefinition,
			...responseDefinition,
			...bodyDefinition,
			...parameters,
		]
			.map((s) => s.model)
			.join('\n'),
	)

	const { operations: apiOperations, schemas: apiSchemas } =
		await _effect_getApiGenerate({
			context,
			input: contextSpecs.input,
			output: contextSpecs.output,
		})

	const apiOperationValues = Object.values(apiOperations)

	const tags = [...new Set(apiOperationValues.map(({ tags }) => tags).flat())]

	const limit = pLimit(3)
	const apiFileGenerates = tags.map((tag) =>
		limit(async () => {
			const operations = apiOperationValues.filter(({ tags }) =>
				tags.includes(tag),
			)
			/**
			 * 统计出tag用哪些接口函数，以及用到了哪些schema，schema有引用了哪些modelSchema
			 */
			const implementations = operations.map(
				({ implementation }) => implementation,
			)

			type Imports = (typeof operations)[number]['imports']

			// 这是接口函数文件用到的通用schema
			const commonSchemaImports: Imports = []
			// 这是接口函数文件用到的特用schema
			const schemaImports: Imports = []
			// 这是接口函数特用schema用到的通用schema
			const schemaCommonImports: Imports = []

			operations
				.map(({ imports }) => imports)
				.flat()
				.forEach((meta) => {
					// 这是接口函数文件用到的通用schema
					if (meta.schemaName) {
						commonSchemaImports.push(meta)
						return
					}

					// 这是接口函数文件用到的特用schema
					schemaImports.push(meta)

					const target = apiSchemas.find((schema) => schema.name === meta.name)
					if (target !== undefined) {
						// 这是接口函数特用schema用到的通用schema
						schemaCommonImports.push(
							...target.imports.filter(({ schemaName }) => schemaName),
						)
					}
				})

			// [tag].schema.ts
			const schemaRaw = `${
				schemaCommonImports.length === 0
					? ''
					: `import type {${[...new Set(schemaCommonImports.map(({ name }) => name))].join(',')},} from './_schemas.gen'
`
			}${[...new Set(schemaImports.map(({ name }) => name))].map((name) => apiSchemas.find((s) => s.name === name)?.model).join('\n')}`
			if (schemaRaw.trim().length > 0) {
				await writeFile(
					path.resolve(outputDir, `${kebab(tag)}.schema.ts`),
					schemaRaw,
				)
			}

			// [tag].ts
			const implementationRaw = `${
				commonSchemaImports.length === 0
					? ''
					: `import type {${[...new Set(commonSchemaImports.map(({ name }) => name))].join(',')},} from './_schemas.gen'
`
			}${
				schemaImports.length === 0
					? ''
					: `import type {${[...new Set(schemaImports.map(({ name }) => name))].join(',')},} from './${kebab(tag)}.schema'
`
			}${IMPORT_HEAD}

${implementations.map((implementation) => implementation).join('\n')}`
			if (implementationRaw.trim().length > 0) {
				await writeFile(
					path.resolve(outputDir, `${kebab(tag)}.ts`),
					implementationRaw,
				)
			}
		}),
	)

	await Promise.all(apiFileGenerates)

	try {
		await execa('pnpm', [
			'biome',
			'format',
			'--write',
			outputDir,
			'--quote-style=single',
			'--semicolons=as-needed',
		])
	} catch (_) {}
}

async function main() {
	p.intro(`V_${pc.bgYellowBright(pc.green('2.0.0'))}`)

	const config = await readConfig()
	const limit = pLimit(3)
	const generates = config.api_addresses.map((api) => {
		return limit(() => generateAPIFile(api))
	})

	await Promise.all(generates)

	p.outro('通过通过通过')
}

main().catch((error) => {
	console.error('生成失败❌', error)
	process.exit(1)
})
