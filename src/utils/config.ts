import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path/posix'

export type Config = {
	api_addresses: {
		definition: string
		address: string
		generate?: boolean
	}[]
}

export async function loadConfig(): Promise<Config> {
	const configFileRaw = await readFile(
		resolve('src/api', 'openapi_api.json'),
		'utf8',
	)
	return JSON.parse(configFileRaw) as Config
}
