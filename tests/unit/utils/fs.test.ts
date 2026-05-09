import { access, mkdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('del', () => ({
	deleteAsync: vi.fn(() => Promise.resolve()),
}))

describe('ensureDir', () => {
	const testDir = resolve('test-fs-temp')

	beforeEach(async () => {
		await rm(testDir, { recursive: true, force: true })
	})

	afterEach(async () => {
		await rm(testDir, { recursive: true, force: true })
		vi.clearAllMocks()
	})

	it('目录不存在时应创建目录', async () => {
		const { ensureDir } = await import('../../../src/utils/fs')

		await ensureDir('test-fs-temp', false)

		const exists = await access(testDir)
			.then(() => true)
			.catch(() => false)
		expect(exists).toBe(true)
	})

	it('目录存在时应调用 deleteAsync 清理', async () => {
		const { ensureDir } = await import('../../../src/utils/fs')
		const { deleteAsync } = await import('del')

		await mkdir(testDir, { recursive: true })
		await writeFile(resolve(testDir, 'test.txt'), 'test')

		await ensureDir('test-fs-temp', false)

		expect(deleteAsync).toHaveBeenCalled()
	})

	it('deleteAsync 失败时非 dev 模式不应抛出错误', async () => {
		const { ensureDir } = await import('../../../src/utils/fs')
		const { deleteAsync } = await import('del')

		await mkdir(testDir, { recursive: true })
		;(deleteAsync as any).mockRejectedValueOnce(new Error('delete failed'))

		await expect(ensureDir('test-fs-temp', false)).resolves.not.toThrow()
	})

	it('deleteAsync 失败时 dev 模式应输出警告', async () => {
		const { ensureDir } = await import('../../../src/utils/fs')
		const { deleteAsync } = await import('del')
		const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

		await mkdir(testDir, { recursive: true })
		;(deleteAsync as any).mockRejectedValueOnce(new Error('delete failed'))

		await ensureDir('test-fs-temp', true)

		expect(consoleSpy).toHaveBeenCalled()
		consoleSpy.mockRestore()
	})

	it('目录不存在时应创建嵌套目录', async () => {
		const { ensureDir } = await import('../../../src/utils/fs')
		const nestedDir = resolve('test-fs-temp', 'nested', 'deep')

		await ensureDir('test-fs-temp/nested/deep', false)

		const exists = await access(nestedDir)
			.then(() => true)
			.catch(() => false)
		expect(exists).toBe(true)
	})
})
