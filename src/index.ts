import { writeFile } from 'node:fs/promises'
import { execa } from 'execa'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import type { SchemasObject } from 'openapi3-ts/oas30'
import { generateSchemasDefinition, upath, kebab } from '@orval/core'
import {
	_effect_generateContextSpecs,
	_effect_getApiGenerate,
} from 'orval-effect'

const IMPORT_HEAD = `import { _http } from './_http.ts'`
const workspace = process.cwd()

async function main() {
	console.clear()
	p.intro(`V_${pc.bgYellow(pc.red('1.0.5'))}`)

	const spin = p.spinner()

	let argSchemaAddress = process.argv.slice(2)[0]

	if(!argSchemaAddress?.trim()) {
		const schemaAddress = await p.text({
			message: 'schema',
			placeholder: 'openapi.schema.json',
			validate: (value) => {
				if (!value.trim()) return '没有没有没有'
			},
		})
	
		if (p.isCancel(schemaAddress)) {
			process.exit(0)
		}

		argSchemaAddress = schemaAddress
	}

	spin.start('生成上下文')
	const { specValue, input, ...contextSpecs } =
		await _effect_generateContextSpecs({
			input: argSchemaAddress,
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
		}).finally(() => spin.stop('生成上下文'))

	try {
		spin.start('生成模型文件')
		const schemasDefinition = generateSchemasDefinition(
			specValue?.components?.schemas as SchemasObject,
			contextSpecs,
			'',
		)
		await writeFile(
			upath.resolve(workspace, 'src/api/_models.gen.ts'),
			schemasDefinition.map((s) => s.model).join('\n'),
		)
	} finally {
		spin.stop('生成模型文件')
	}

	spin.start('生成接口模型')
	const { operations: apiOperations, schemas: apiSchemas } =
		await _effect_getApiGenerate({
			input,
			output: contextSpecs.output,
			context: contextSpecs,
		}).finally(() => spin.stop('生成接口模型'))

	const operationValues = Object.values(apiOperations)

	const tags = [...new Set(operationValues.map(({ tags }) => tags).flat())]

	const apiGenerates = tags.map(async (tag) => {
		const operations = operationValues.filter(({ tags }) => tags.includes(tag))
		/**
		 * 统计出tag用哪些接口函数，以及用到了哪些schema，schema有引用了哪些modelSchema
		 */
		const implementations = operations.map(
			({ implementation }) => implementation,
		)

		type Imports = (typeof operations)[number]['imports']

		// 接口要的request/response模型
		const apiImports: Imports = []
		// request/response模型要的模型
		const apiSchemaImports: Imports = []
		// 接口要的模型
		const schemaImports: Imports = []

		operations
			.map(({ imports }) => imports)
			.flat()
			.forEach((imports) => {
				if (imports.schemaName) {
					schemaImports.push(imports)
					return
				}

				apiImports.push(imports)

				const target = apiSchemas.find((schema) => schema.name === imports.name)
				if (target !== undefined) {
					apiSchemaImports.push(
						...target.imports.filter(({ schemaName }) => schemaName),
					)
				}
			})

		const schemaRaw = `${
			apiSchemaImports.length === 0
				? ''
				: `import type {${[...new Set(apiSchemaImports.map(({ schemaName }) => schemaName))].join(',')},} from './_models.gen'

`
		}${[...new Set(apiImports.map(({ name }) => name))].map((name) => apiSchemas.find((s) => s.name === name)?.model).join('\n')}`

		if (schemaRaw.trim().length > 0) {
			await writeFile(
				upath.resolve(workspace, `src/api/${kebab(tag)}.schema.ts`),
				schemaRaw,
			)
		}

		const implementationRaw = `${
			schemaImports.length === 0
				? ''
				: `import type {${[...new Set(schemaImports.map(({ schemaName }) => schemaName))].join(',')},} from './_models.gen'
`
		}${
			apiImports.length === 0
				? ''
				: `import type {${[...new Set(apiImports.map(({ name }) => name))].join(',')},} from './${kebab(tag)}.schema'
`
		}${IMPORT_HEAD}

${implementations.map((implementation) => implementation).join('\n')}`

		if (implementationRaw.trim().length > 0) {
			await writeFile(
				upath.resolve(workspace, `src/api/${kebab(tag)}.ts`),
				implementationRaw,
			)
		}
	})

	spin.start('生成接口文件')
	await Promise.all(apiGenerates).finally(() => spin.stop('生成接口文件'))

	try {
		spin.start('尝试格式化')
		await execa('pnpm', [
			'biome',
			'format',
			'--write',
			upath.resolve(workspace, 'src/api/'),
			'--quote-style=single',
			'--semicolons=as-needed',
		])
		spin.stop('尝试格式化')
	} catch {
		spin.stop('尝试格式化')
	}

	p.outro('✅')
}

main().catch((error) =>
	console.error('❌', error),
)
