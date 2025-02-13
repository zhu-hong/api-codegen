import { writeFile } from 'node:fs/promises'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import type { SchemasObject } from 'openapi3-ts/oas30'
import {
	generateSchemasDefinition,
	generateComponentDefinition,
	generateParameterDefinition,
	upath,
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

const IMPORT_HEAD = `import { _http } from './_http'`
const workspace = process.cwd()

async function main() {
	p.intro(`V_${pc.bgYellowBright(pc.green('1.1.3'))}`)

	const spin = p.spinner()

	// 命令行带参数就跳过手输
	let schemaAddress = process.argv.slice(2)[0]
	if (!schemaAddress?.trim()) {
		const schemaAddressInput = await p.text({
			message: 'schema',
			placeholder: 'openapi.schema.json',
			validate: (value) => {
				if (!value.trim()) return '没有没有没有'
			},
		})

		if (p.isCancel(schemaAddressInput)) {
			process.exit(0)
		}

		schemaAddress = schemaAddressInput
	}

	spin.start('gen context')
	const contextSpecs = await _effect_generateContextSpecs({
		input: schemaAddress,
		output: {
			target: upath.resolve(workspace, 'src/api/'),
			mode: 'tags',
			override: {
				mutator: {
					path: upath.resolve(workspace, 'src/api/_http.ts'),
					name: '_http',
				},
			},
		},
	}).finally(() => spin.stop('gen context'))

	const [specKey, spec] = Object.entries(contextSpecs.specs)[0]

	const context = {
		output: contextSpecs.output,
		specKey,
		specs: contextSpecs.specs,
		target: contextSpecs.target,
		workspace: contextSpecs.workspace,
	}

	try {
		spin.start('gen common schema')

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
		// 所有的通用模型（#/components/schemas）不分组写入一个文件
		await writeFile(
			upath.resolve(workspace, 'src/api/_schemas.gen.ts'),
			[
				...schemasDefinition,
				...responseDefinition,
				...bodyDefinition,
				...parameters,
			]
				.map((s) => s.model)
				.join('\n'),
		)
	} finally {
		spin.stop('gen common schema')
	}

	spin.start('gen api schema')
	const { operations: apiOperations, schemas: apiSchemas } =
		await _effect_getApiGenerate({
			context,
			input: contextSpecs.input,
			output: contextSpecs.output,
		}).finally(() => spin.stop('gen api schema'))

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
					upath.resolve(workspace, `src/api/${kebab(tag)}.schema.ts`),
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
					upath.resolve(workspace, `src/api/${kebab(tag)}.ts`),
					implementationRaw,
				)
			}
		}),
	)

	spin.start('gen api file')
	await Promise.all(apiFileGenerates).finally(() => spin.stop('gen api file'))

	try {
		spin.start('format')
		await execa('pnpm', [
			'biome',
			'format',
			'--write',
			upath.resolve(workspace, 'src/api/'),
			'--quote-style=single',
			'--semicolons=as-needed',
		])
		spin.stop('format')
	} catch {
		// 即使错误也不耽误
		spin.stop('❌ format')
	}

	p.outro('通过通过通过')
}

main().catch((error) => {
	console.error('❌', error)
	process.exit(1)
})
