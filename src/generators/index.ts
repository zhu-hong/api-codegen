import { resolve } from 'node:path'
import { isString } from '@orval/core'
import {
	_effect_getApiBuilder,
	applyTransformer,
	normalizeOptions,
	resolveSpec,
} from '@zhuh/orval'
import pLimit from 'p-limit'
import type { Config } from '../utils/config'
import { runBiomeFormat } from '../utils/format'
import { ensureDir } from '../utils/fs'
import { writeExportFile } from './export'
import { getCommonSchemas, writeCommonSchema } from './schema'
import { generateTagFiles } from './tag'

export async function generateAPIFile(
	api: Config['api_addresses'][number],
	isDev: boolean,
): Promise<void> {
	const { address, definition } = api
	const workspace = process.cwd()
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

	await ensureDir(outdir, isDev)

	const exportFiles: string[] = []
	const limit = pLimit(8)

	const allCommonSchema = getCommonSchemas({
		input: configOptions.input,
		output: configOptions.output,
		workspace,
		spec: transformedOpenApi,
	})

	const apiFileGenerates: Promise<void>[] = []

	const apiOperationValues = Object.values(apiOperations)
	const tags = [...new Set(apiOperationValues.flatMap(({ tags }) => tags))]

	tags.forEach((tag) => {
		apiFileGenerates.push(
			limit(async () => {
				const operations = apiOperationValues.filter(({ tags }) =>
					tags.includes(tag),
				)
				await generateTagFiles(
					outdirAbsolute,
					tag,
					operations,
					apiSchemas,
					allCommonSchema,
					exportFiles,
				)
			}),
		)
	})

	apiFileGenerates.push(
		limit(
			async () =>
				await writeCommonSchema(outdirAbsolute, allCommonSchema, exportFiles),
		),
	)

	await Promise.all(apiFileGenerates)

	await writeExportFile(outdirAbsolute, exportFiles)

	await runBiomeFormat(outdirAbsolute, isDev)
}
