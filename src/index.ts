#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import * as p from '@clack/prompts'
import orval, { type ContextSpecs } from '@orval/core'
import { deleteAsync } from 'del'
import { execa } from 'execa'
import type { SchemasObject } from 'openapi3-ts/oas30'
import {
	_effect_generateContextSpecs,
	_effect_getAllSchemas,
	_effect_getApiGenerate,
} from 'orval-effect'
import pLimit from 'p-limit'
import pc from 'picocolors'
import { relative } from 'node:path/posix'

const {
	generateComponentDefinition,
	generateParameterDefinition,
	generateSchemasDefinition,
	kebab,
} = orval

type Config = {
	api_addresses: {
		definition: string
		address: string
		generate?: boolean
	}[]
}

const args = process.argv

const ISDEV = args.includes('-d')

const spin = p.spinner()

async function loadConfig(): Promise<Config> {
	const configFileRaw = await readFile(
		resolve('src/api', 'openapi_api.json'),
		'utf8',
	)
	return JSON.parse(configFileRaw) as Config
}

async function generateAPIFile(api: Config['api_addresses'][number]) {
	const { address, definition } = api

	const context = await _effect_generateContextSpecs({
		input: {
			target: address,
		},
		output: {
			target: resolve(join('src/api', definition)),
			mode: 'tags',
			override: {
				mutator: {
					path: resolve('src/api/_http.ts'),
					name: '_http',
				},
			},
		},
	})

	const [specKey, spec] = Object.entries(context.specs)[0]

	const contextArgs: ContextSpecs = {
		specKey,
		target: context.target,
		workspace: context.workspace,
		specs: context.specs,
		output: context.output,
	}

	const parsedSchemas = spec.openapi
		? (spec.components?.schemas as SchemasObject)
		: _effect_getAllSchemas(spec, specKey)

	const schemasDefinition = generateSchemasDefinition(
		parsedSchemas,
		contextArgs,
		context.output.override.components.schemas.suffix,
		context.input.filters,
	)
	const responseDefinition = generateComponentDefinition(
		spec.components?.responses,
		contextArgs,
		context.output.override.components.responses.suffix,
	)
	const bodyDefinition = generateComponentDefinition(
		spec.components?.requestBodies,
		contextArgs,
		context.output.override.components.requestBodies.suffix,
	)
	const parameters = generateParameterDefinition(
		spec.components?.parameters,
		contextArgs,
		context.output.override.components.parameters.suffix,
	)

	const outputDir = resolve('src/api', definition)

	// 建好文件夹
	await access(outputDir).catch(async (error) => {
		if (ISDEV) {
			console.warn(
				`\n${pc.bgYellowBright(pc.green('只是警告'))}`,
				`访问文件夹${outputDir}错误`,
				error,
			)
		}
		await mkdir(outputDir)
	})

	const { operations: apiOperations, schemas: apiSchemas } =
		await _effect_getApiGenerate({
			context: contextArgs,
			input: context.input,
			output: context.output,
		})

	try {
		await deleteAsync([
			join(outputDir, '*'),
			`!${join(outputDir, '**/')}`,
			`!${join(outputDir, '_http.ts')}`,
			`!${join(outputDir, 'openapi_api.json')}`,
		])
	} catch (error) {
		if (ISDEV) {
			console.warn(
				`\n${pc.bgYellowBright(pc.green('只是警告'))}`,
				'deleteAsync错误',
				error,
			)
		}
	}

	const apiFileGenerates: Promise<void>[] = []
	const limit = pLimit(8)

	/**
	 * 所有的通用模型（#/components/schemas）不分组写入一个文件
	 */
	const allCommonSchema = [
		...schemasDefinition,
		...responseDefinition,
		...bodyDefinition,
		...parameters,
	]
	const writeCommonSchema = async () => {
		await writeFile(
			resolve(outputDir, '_schemas.gen.ts'),
			allCommonSchema.map((s) => s.model).join('\n'),
		)
	}

	const apiOperationValues = Object.values(apiOperations)

	const tags = [...new Set(apiOperationValues.flatMap(({ tags }) => tags))]

	tags.forEach((tag) => {
		apiFileGenerates.push(
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

				/**
				 * 这是接口函数文件用到的通用schema
				 * [tag].ts import _schemas.gen.ts
				 */
				const commonSchemaImports: Imports = []
				/**
				 * 这是接口函数文件用到的特用schema
				 * [tag].ts import [tag].schema.ts
				 */
				const schemaImports: Imports = []
				/**
				 * 这是接口函数特用schema用到的通用schema
				 * [tag].schema.ts import _schemas.gen.ts
				 */
				const schemaCommonImports: Imports = []

				operations
					.flatMap(({ imports }) => imports)
					.forEach((meta) => {
						// 这是接口函数文件用到的通用schema
						if (meta.schemaName) {
							if (
								!commonSchemaImports.find(
									(s) => s.schemaName === meta.schemaName,
								)
							) {
								commonSchemaImports.push(meta)
							}
							return
						}

						// 这是接口函数文件用到的特用schema
						if (!schemaImports.find((s) => s.name === meta.name)) {
							schemaImports.push(meta)
						}

						const target = apiSchemas.find(
							(schema) => schema.name === meta.name,
						)
						if (target) {
							// 这是接口函数特用schema用到的通用schema
							schemaCommonImports.push(
								...target.imports.filter(({ name }) => name),
							)
						}
					})

				// 添加不是$ref的schema
				schemaCommonImports.forEach((schemaCommon) => {
					const exported = allCommonSchema
						.map((s) => s.name)
						.find((name) => name === schemaCommon.name)
					if (!exported) {
						const target = apiSchemas.find((s) => s.name === schemaCommon.name)
						if (target) {
							allCommonSchema.unshift(target)
						}
					}
				})

				// 把不存在的过滤掉
				const allCommonSchemaName = allCommonSchema.map((s) => s.name)
				commonSchemaImports.forEach((schema) => {
					if (!allCommonSchemaName.includes(schema.name)) {
						schema.name = ''
					}
					if (
						schema.schemaName &&
						!allCommonSchemaName.includes(schema.schemaName)
					) {
						schema.schemaName = ''
					}
				})

				await Promise.all([
					(async () => {
						// [tag].schema.ts
						const schemaRaw = `${
							schemaCommonImports.length === 0
								? ''
								: `import type {${[...new Set(schemaCommonImports.map(({ name }) => name))].join(',')}} from './_schemas.gen'
`
						}
${[...new Set(schemaImports.map(({ name }) => name))].map((name) => apiSchemas.find((s) => s.name === name)?.model ?? '').join('\n')}
`
						if (schemaRaw.trim().length > 0) {
							await writeFile(
								resolve(outputDir, `${kebab(tag)}.schema.ts`),
								schemaRaw,
							)
						}
					})(),
					(async () => {
						let mutatorPath = relative(outputDir, resolve('src/api/_http'))

						if (!mutatorPath.startsWith('..')) {
							mutatorPath = `./${mutatorPath}`
						}

						// [tag].ts
						const implementationRaw = `import { _http } from '${mutatorPath}'
${
	commonSchemaImports.length === 0
		? ''
		: `import type {${[...new Set(commonSchemaImports.flatMap(({ name, schemaName }) => [name, schemaName]).filter(Boolean))].join(',')}} from './_schemas.gen'
`
}${
	schemaImports.length === 0
		? ''
		: `import type {${[...new Set(schemaImports.map(({ name }) => name))].join(',')}} from './${kebab(tag)}.schema'
`
}
${implementations.map((implementation) => implementation).join('\n')}`
						if (implementationRaw.trim().length > 0) {
							await writeFile(
								resolve(outputDir, `${kebab(tag)}.ts`),
								implementationRaw,
							)
						}
					})(),
				])
			}),
		)
	})

	apiFileGenerates.push(limit(async () => await writeCommonSchema()))

	await Promise.all(apiFileGenerates)

	try {
		await execa('pnpm', [
			'biome',
			'check',
			'--write',
			outputDir,
			'--formatter-enabled=true',
			'--javascript-formatter-quote-style=single',
			'--semicolons=as-needed',
			'--linter-enabled=false',
		])
	} catch (error) {
		if (ISDEV) {
			console.warn(
				`\n${pc.bgYellowBright(pc.green('只是警告'))}`,
				'biome格式化错误',
				error,
			)
		}
	}
}

async function main() {
	p.intro(
		`V_${pc.bgYellowBright(pc.green(ISDEV ? new Date().toLocaleString() : __buildVersion))}`,
	)
	let config: Config | null = null

	// 兼容版本1用法
	const parseV1SchemaPath = () => {
		const target = args.indexOf('-s')

		if (target === -1) return

		return args[target + 1]
	}
	const schemaPath = parseV1SchemaPath()
	if (schemaPath) {
		config = {
			api_addresses: [
				{
					address: schemaPath,
					definition: '',
				},
			],
		}
	} else {
		config = await loadConfig()
	}

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

	p.outro('mymymytg 👏👏👏')
}

main().catch((error) => {
	console.error('❌ 发生错误', error)
	process.exit(1)
})
