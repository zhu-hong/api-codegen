import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('execa', () => ({
	execa: vi.fn(() => Promise.resolve({ stdout: '', stderr: '' })),
}))

describe('runBiomeFormat', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('应调用 execa 执行 biome 格式化', async () => {
		const { runBiomeFormat } = await import('../../../src/utils/format')
		const { execa } = await import('execa')

		await runBiomeFormat('/test/dir', false)

		expect(execa).toHaveBeenCalledWith('pnpm', [
			'biome',
			'check',
			'--write',
			'/test/dir',
			'--formatter-enabled=true',
			'--javascript-formatter-quote-style=single',
			'--semicolons=as-needed',
			'--linter-enabled=false',
		])
	})

	it('execa 失败时非 dev 模式不应输出警告', async () => {
		const { runBiomeFormat } = await import('../../../src/utils/format')
		const { execa } = await import('execa')
		const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

		;(execa as any).mockRejectedValueOnce(new Error('format failed'))

		await runBiomeFormat('/test/dir', false)

		expect(consoleSpy).not.toHaveBeenCalled()
		consoleSpy.mockRestore()
	})

	it('execa 失败时 dev 模式应输出警告', async () => {
		const { runBiomeFormat } = await import('../../../src/utils/format')
		const { execa } = await import('execa')
		const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

		;(execa as any).mockRejectedValueOnce(new Error('format failed'))

		await runBiomeFormat('/test/dir', true)

		expect(consoleSpy).toHaveBeenCalledWith(
			'biome格式化错误',
			expect.any(Error),
		)
		consoleSpy.mockRestore()
	})

	it('应传递正确的目录参数', async () => {
		const { runBiomeFormat } = await import('../../../src/utils/format')
		const { execa } = await import('execa')

		await runBiomeFormat('/custom/path', false)

		expect(execa).toHaveBeenCalledWith(
			'pnpm',
			expect.arrayContaining(['/custom/path']),
		)
	})
})
