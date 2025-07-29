#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import * as p from '@clack/prompts'
import {
	generateComponentDefinition,
	generateParameterDefinition,
	generateSchemasDefinition,
	kebab,
	RefComponentSuffix,
} from '@orval/core'
import { execa } from 'execa'
import type { SchemasObject } from 'openapi3-ts/oas30'
import {
	_effect_generateContextSpecs,
	_effect_getAllSchemas,
	_effect_getApiGenerate,
} from 'orval-effect'
import pLimit from 'p-limit'
import pc from 'picocolors'

type Config = {
	api_addresses: {
		definition: string
		address: string
		generate?: boolean
	}[]
}

let ISDEV = process.argv.includes('-d')

const IMPORT_MUTATOR = `import { _http } from '@/api/_http'`
const workspace = process.cwd()

const spin = p.spinner()

async function loadConfig(): Promise<Config> {
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
			const implementationRaw = `${IMPORT_MUTATOR}
${
	commonSchemaImports.length === 0
		? ''
		: `import type {${[...new Set(commonSchemaImports.map(({ name }) => name))].join(',')},} from './_schemas.gen'
`
}${
	schemaImports.length === 0
		? ''
		: `import type {${[...new Set(schemaImports.map(({ name }) => name))].join(',')},} from './${kebab(tag)}.schema'
`
}

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
			'--javascript-formatter-quote-style=single',
			'--semicolons=as-needed',
		])
	} catch (error) {
		if (ISDEV) {
			console.error(error)
		}
	}
}

async function main() {
	p.intro(`V_${pc.bgYellowBright(pc.green(ISDEV ? 'now' : __buildVersion))}`)

	const config = await loadConfig()
	const limit = pLimit(1)
	const generates = config.api_addresses
		.filter(({ generate }) => generate !== false)
		.map((api) =>
			limit(async () => {
				const definition = api.definition || 'root'

				spin.start(`正在生成：${definition}`)
				await generateAPIFile(api).catch((error) => {
					spin.stop(`⁉️ ${definition}`)
					throw error
				})
				spin.stop(`✅ ${definition}`)
			}),
		)

	await Promise.all(generates)

	p.outro('通过通过通过 👏👏👏')
}

main().catch((error) => {
	console.error('❌ 发生错误', error)
	process.exit(1)
})
