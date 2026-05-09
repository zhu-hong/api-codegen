import { mkdir, readFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { writeExportFile } from '@/generators/export'

describe('writeExportFile', () => {
	const testDir = resolve('test-export-temp')

	beforeEach(async () => {
		await mkdir(testDir, { recursive: true })
	})

	afterEach(async () => {
		await rm(testDir, { recursive: true, force: true })
	})

	it('应生成正确的 export 语句', async () => {
		const exportFiles = ['_schemas.gen.ts', 'test.ts', 'test.schema.ts']

		await writeExportFile(testDir, exportFiles)

		const content = await readFile(resolve(testDir, '_export.ts'), 'utf8')
		expect(content).toContain("export * from './_schemas.gen'")
		expect(content).toContain("export * from './test'")
		expect(content).toContain("export * from './test.schema'")
	})

	it('无文件时不生成', async () => {
		const exportFiles: string[] = []

		await writeExportFile(testDir, exportFiles)

		const exists = await readFile(resolve(testDir, '_export.ts'))
			.then(() => true)
			.catch(() => false)
		expect(exists).toBe(false)
	})

	it('应处理单个文件', async () => {
		const exportFiles = ['api.ts']

		await writeExportFile(testDir, exportFiles)

		const content = await readFile(resolve(testDir, '_export.ts'), 'utf8')
		expect(content).toContain("export * from './api'")
		expect(content.split('\n').filter((l) => l.trim())).toHaveLength(1)
	})

	it('应使用 kebab-case 文件名', async () => {
		const exportFiles = ['my-api.ts', 'test-schema.ts']

		await writeExportFile(testDir, exportFiles)

		const content = await readFile(resolve(testDir, '_export.ts'), 'utf8')
		expect(content).toContain("export * from './my-api'")
		expect(content).toContain("export * from './test-schema'")
	})
})
