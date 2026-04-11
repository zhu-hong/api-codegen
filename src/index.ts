#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { parse, relative } from 'node:path/posix'
import * as p from '@clack/prompts'
import { isString, kebab } from '@orval/core'
import {
	_effect_getApiBuilder,
	applyTransformer,
	getApiSchemas,
	normalizeOptions,
	resolveSpec,
} from '@zhuh/orval'
import { deleteAsync } from 'del'
import { execa } from 'execa'
import pLimit from 'p-limit'
import pc from 'picocolors'

type Config = {
	api_addresses: {
		definition: string
		address: string
		generate?: boolean
	}[]
}

const workspace = process.cwd()

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

	const outdir = `src/api/${definition}`

	const outdirAbsolute = resolve(outdir)

	const configOptions = await normalizeOptions({
		input: address,
		output: {
			httpClient: 'axios',
			target: outdirAbsolute,
			override: {
				mutator: {
					path: resolve('src/api/_http.ts'),
					name: '_http',
				},
			},
		},
	})

	const spec = await resolveSpec(
		configOptions.input.target,
		configOptions.input.parserOptions,
	)
	const transformedOpenApi = await applyTransformer(
		spec,
		configOptions.input.override.transformer,
		workspace,
	)

	const { operations: apiOperations, schemas: apiSchemas } =
		await _effect_getApiBuilder({
			input: configOptions.input,
			output: configOptions.output,
			context: {
				target: isString(configOptions.input.target)
					? configOptions.input.target
					: workspace,
				workspace,
				spec: transformedOpenApi,
				output: configOptions.output,
			},
		})

	// 建好文件夹
	await access(outdirAbsolute)
		.then(async () => {
			try {
				await deleteAsync([
					`${outdir}/*`,
					`!${outdir}/*/`,
					`!${outdir}/_http.ts`,
					`!${outdir}/openapi_api.json`,
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
		})
		.catch(async (error) => {
			if (ISDEV) {
				console.warn(
					`\n${pc.bgYellowBright(pc.green('只是警告'))}`,
					`访问文件夹${outdirAbsolute}错误`,
					error,
				)
			}
			await mkdir(outdirAbsolute, {
				recursive: true,
			})
		})

	const apiFileGenerates: Promise<void>[] = []
	const limit = pLimit(8)

	const exportFiles: string[] = []

	/**
	 * 所有的通用模型（#/components/schemas）不分组写入一个文件
	 */
	const allCommonSchema = getApiSchemas({
		input: configOptions.input,
		output: configOptions.output,
		target: isString(configOptions.input.target)
			? configOptions.input.target
			: workspace,
		workspace,
		spec: transformedOpenApi,
	})
	const writeCommonSchema = async () => {
		if (allCommonSchema.filter((c) => c.model).length === 0) return

		await writeFile(
			resolve(outdirAbsolute, '_schemas.gen.ts'),
			allCommonSchema.map((s) => s.model).join('\n'),
		)
		exportFiles.push('_schemas.gen.ts')
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
				let commonSchemaImports: Imports = []
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
				commonSchemaImports = commonSchemaImports.map((schema) => {
					if (!allCommonSchemaName.includes(schema.name)) {
						return {
							...schema,
							name: '',
						}
					}
					if (
						schema.schemaName &&
						!allCommonSchemaName.includes(schema.schemaName)
					) {
						return {
							...schema,
							schemaName: '',
						}
					}

					return { ...schema }
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
								resolve(outdirAbsolute, `${kebab(tag)}.schema.ts`),
								schemaRaw,
							)
							exportFiles.push(`${kebab(tag)}.schema.ts`)
						}
					})(),
					(async () => {
						let mutatorPath = relative(outdir, 'src/api/_http')

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
								resolve(outdirAbsolute, `${kebab(tag)}.ts`),
								implementationRaw,
							)
							exportFiles.push(`${kebab(tag)}.ts`)
						}
					})(),
				])
			}),
		)
	})

	apiFileGenerates.push(limit(async () => await writeCommonSchema()))

	await Promise.all(apiFileGenerates)

	if (exportFiles.length > 0) {
		await writeFile(
			resolve(outdirAbsolute, '_export.ts'),
			`${exportFiles.map((f) => `export * from './${parse(f).name}'`).join('\n')}
`,
		)
	}

	try {
		await execa('pnpm', [
			'biome',
			'check',
			'--write',
			outdirAbsolute,
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
