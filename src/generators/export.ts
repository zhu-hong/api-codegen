import { writeFile } from 'node:fs/promises'
import { parse, resolve } from 'node:path'

export async function writeExportFile(
	outdir: string,
	exportFiles: string[],
): Promise<void> {
	if (exportFiles.length === 0) return

	const content = `${exportFiles.map((f) => `export * from './${parse(f).name}'`).join('\n')}
`
	await writeFile(resolve(outdir, '_export.ts'), content)
}
