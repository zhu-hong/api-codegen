import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path/posix'
import { isString } from '@orval/core'
import { getApiSchemas } from '@zhuh/orval'

export type SchemaItem = {
	name: string
	schemaName?: string
	model?: string
	imports: { name: string; schemaName?: string }[]
}

export function getCommonSchemas(options: {
	input: any
	output: any
	workspace: string
	spec: any
}): SchemaItem[] {
	const { input, output, workspace, spec } = options

	return getApiSchemas({
		input,
		output,
		target: isString(input.target) ? input.target : workspace,
		workspace,
		spec,
	})
}

export async function writeCommonSchema(
	outdir: string,
	schemas: SchemaItem[],
	exportFiles: string[],
): Promise<void> {
	if (schemas.filter((c) => c.model).length === 0) return

	await writeFile(
		resolve(outdir, '_schemas.gen.ts'),
		schemas.map((s) => s.model).join('\n'),
	)
	exportFiles.push('_schemas.gen.ts')
}
