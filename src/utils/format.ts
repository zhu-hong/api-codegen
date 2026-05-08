import { execa } from 'execa'

export async function runBiomeFormat(
	dir: string,
	isDev: boolean,
): Promise<void> {
	try {
		await execa('pnpm', [
			'biome',
			'check',
			'--write',
			dir,
			'--formatter-enabled=true',
			'--javascript-formatter-quote-style=single',
			'--semicolons=as-needed',
			'--linter-enabled=false',
		])
	} catch (error) {
		if (isDev) {
			console.warn('biome格式化错误', error)
		}
	}
}
