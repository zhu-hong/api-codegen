import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('node:fs/promises', async () => {
	const actual =
		await vi.importActual<typeof import('node:fs/promises')>('node:fs/promises')
	return {
		...actual,
		readFile: vi.fn(),
	}
})

describe('loadConfig', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('应正确解析配置文件', async () => {
		const config = {
			api_addresses: [
				{
					definition: 'test',
					address: 'https://example.com/api.json',
				},
			],
		}

		const { readFile } = await import('node:fs/promises')
		;(readFile as any).mockResolvedValue(JSON.stringify(config))

		const { loadConfig } = await import('../../../src/utils/config')
		const result = await loadConfig()

		expect(result.api_addresses).toHaveLength(1)
		expect(result.api_addresses[0].definition).toBe('test')
		expect(result.api_addresses[0].address).toBe('https://example.com/api.json')
	})

	it('应支持 generate: false 配置', async () => {
		const config = {
			api_addresses: [
				{
					definition: 'enabled',
					address: 'https://example.com/api1.json',
					generate: true,
				},
				{
					definition: 'disabled',
					address: 'https://example.com/api2.json',
					generate: false,
				},
			],
		}

		const { readFile } = await import('node:fs/promises')
		;(readFile as any).mockResolvedValue(JSON.stringify(config))

		const { loadConfig } = await import('../../../src/utils/config')
		const result = await loadConfig()

		const enabled = result.api_addresses.filter((a) => a.generate !== false)
		expect(enabled).toHaveLength(1)
		expect(enabled[0].definition).toBe('enabled')
	})

	it('应支持多个 API 配置', async () => {
		const config = {
			api_addresses: [
				{ definition: 'api1', address: 'https://example.com/1.json' },
				{ definition: 'api2', address: 'https://example.com/2.json' },
				{ definition: 'api3', address: 'https://example.com/3.json' },
			],
		}

		const { readFile } = await import('node:fs/promises')
		;(readFile as any).mockResolvedValue(JSON.stringify(config))

		const { loadConfig } = await import('../../../src/utils/config')
		const result = await loadConfig()

		expect(result.api_addresses).toHaveLength(3)
	})

	it('配置文件不存在时应抛出错误', async () => {
		const { readFile } = await import('node:fs/promises')
		;(readFile as any).mockRejectedValue(new Error('ENOENT'))

		const { loadConfig } = await import('../../../src/utils/config')

		await expect(loadConfig()).rejects.toThrow('ENOENT')
	})

	it('JSON 格式错误时应抛出错误', async () => {
		const { readFile } = await import('node:fs/promises')
		;(readFile as any).mockResolvedValue('invalid json')

		const { loadConfig } = await import('../../../src/utils/config')

		await expect(loadConfig()).rejects.toThrow()
	})
})
