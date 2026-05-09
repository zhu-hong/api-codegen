import { writeFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import { kebab } from '@orval/core'
import type { SchemaItem } from './schema'

type Operation = {
	tags: string[]
	implementation: string
	imports: { name: string; schemaName?: string }[]
}

type Imports = Operation['imports']

export async function generateTagFiles(
	outdir: string,
	tag: string,
	operations: Operation[],
	apiSchemas: SchemaItem[],
	allCommonSchema: SchemaItem[],
	exportFiles: string[],
): Promise<void> {
	const implementations = operations.map(({ implementation }) => implementation)

	let commonSchemaImports: Imports = []
	const schemaImports: Imports = []
	const schemaCommonImports: Imports = []

	operations
		.flatMap(({ imports }) => imports)
		.forEach((meta) => {
			if (meta.schemaName) {
				if (
					!commonSchemaImports.find((s) => s.schemaName === meta.schemaName)
				) {
					commonSchemaImports.push(meta)
				}
				return
			}

			if (!schemaImports.find((s) => s.name === meta.name)) {
				schemaImports.push(meta)
			}

			const target = apiSchemas.find((schema) => schema.name === meta.name)
			if (target) {
				schemaCommonImports.push(...target.imports.filter(({ name }) => name))
			}
		})

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

	const allCommonSchemaName = allCommonSchema.map((s) => s.name)
	commonSchemaImports = commonSchemaImports.map((schema) => {
		if (!allCommonSchemaName.includes(schema.name)) {
			return { ...schema, name: '' }
		}
		if (schema.schemaName && !allCommonSchemaName.includes(schema.schemaName)) {
			return { ...schema, schemaName: '' }
		}
		return { ...schema }
	})

	await Promise.all([
		writeSchemaFile(
			outdir,
			tag,
			schemaImports,
			schemaCommonImports,
			apiSchemas,
			exportFiles,
		),
		writeImplementationFile(
			outdir,
			tag,
			implementations,
			commonSchemaImports,
			schemaImports,
			exportFiles,
		),
	])
}

async function writeSchemaFile(
	outdir: string,
	tag: string,
	schemaImports: Imports,
	schemaCommonImports: Imports,
	apiSchemas: SchemaItem[],
	exportFiles: string[],
): Promise<void> {
	const schemaRaw = `${
		schemaCommonImports.length === 0
			? ''
			: `import type {${[...new Set(schemaCommonImports.map(({ name }) => name))].join(',')}} from './_schemas.gen'
`
	}
${[...new Set(schemaImports.map(({ name }) => name))].map((name) => apiSchemas.find((s) => s.name === name)?.model ?? '').join('\n')}
`

	if (schemaRaw.trim().length > 0) {
		await writeFile(resolve(outdir, `${kebab(tag)}.schema.ts`), schemaRaw)
		exportFiles.push(`${kebab(tag)}.schema.ts`)
	}
}

async function writeImplementationFile(
	outdir: string,
	tag: string,
	implementations: string[],
	commonSchemaImports: Imports,
	schemaImports: Imports,
	exportFiles: string[],
): Promise<void> {
	let mutatorPath = relative(outdir, 'src/api/_http')

	if (!mutatorPath.startsWith('..')) {
		mutatorPath = `./${mutatorPath}`
	}

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
		await writeFile(resolve(outdir, `${kebab(tag)}.ts`), implementationRaw)
		exportFiles.push(`${kebab(tag)}.ts`)
	}
}
