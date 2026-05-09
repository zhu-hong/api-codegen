import { access, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { deleteAsync } from 'del'

export async function ensureDir(dir: string, isDev: boolean): Promise<void> {
	const dirAbsolute = resolve(dir)

	await access(dirAbsolute)
		.then(async () => {
			try {
				await deleteAsync([
					`${dir}/*`,
					`!${dir}/*/`,
					`!${dir}/_http.ts`,
					`!${dir}/openapi_api.json`,
				])
			} catch (error) {
				if (isDev) {
					console.warn('deleteAsync错误', error)
				}
			}
		})
		.catch(async (error) => {
			if (isDev) {
				console.warn(`访问文件夹${dirAbsolute}错误`, error)
			}
			await mkdir(dirAbsolute, { recursive: true })
		})
}
