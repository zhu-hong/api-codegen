import * as p from '@clack/prompts'
import pLimit from 'p-limit'
import pc from 'picocolors'
import { generateAPIFile } from './generators'
import { loadConfig } from './utils/config'

const args = process.argv
const ISDEV = args.includes('-d')
const spin = p.spinner()

async function main() {
	p.intro(
		`V_${pc.bgYellowBright(pc.green(ISDEV ? new Date().toLocaleString() : __buildVersion))}`,
	)

	let config = null

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
				await generateAPIFile(api, ISDEV).catch((error) => {
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
