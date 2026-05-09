import { mkdir, readFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@zhuh/orval', () => ({
	getApiSchemas: vi.fn(),
}))

vi.mock('@orval/core', () => ({
	isString: vi.fn((val) => typeof val === 'string'),
	kebab: vi.fn((str) => str.toLowerCase().replace(/\s+/g, '-')),
}))

describe('writeCommonSchema', () => {
	const testDir = resolve('test-schema-temp')

	beforeEach(async () => {
		await mkdir(testDir, { recursive: true })
	})

	afterEach(async () => {
		await rm(testDir, { recursive: true, force: true })
		vi.clearAllMocks()
	})

	it('应写入 _schemas.gen.ts 文件', async () => {
		const { writeCommonSchema } = await import('../../../src/generators/schema')
		const schemas = [
			{
				name: 'Result',
				model: 'export type Result = {\n  code: number\n  message: string\n}',
				imports: [],
			},
		]
		const exportFiles: string[] = []

		await writeCommonSchema(testDir, schemas, exportFiles)

		const content = await readFile(resolve(testDir, '_schemas.gen.ts'), 'utf8')
		expect(content).toContain('export type Result')
		expect(exportFiles).toContain('_schemas.gen.ts')
	})

	it('无 schema 时不生成文件', async () => {
		const { writeCommonSchema } = await import('../../../src/generators/schema')
		const schemas = [
			{
				name: 'Empty',
				model: '',
				imports: [],
			},
		]
		const exportFiles: string[] = []

		await writeCommonSchema(testDir, schemas, exportFiles)

		const exists = await readFile(resolve(testDir, '_schemas.gen.ts'))
			.then(() => true)
			.catch(() => false)
		expect(exists).toBe(false)
		expect(exportFiles).toHaveLength(0)
	})

	it('应合并多个 schema', async () => {
		const { writeCommonSchema } = await import('../../../src/generators/schema')
		const schemas = [
			{
				name: 'Schema1',
				model: 'export type Schema1 = { id: string }',
				imports: [],
			},
			{
				name: 'Schema2',
				model: 'export type Schema2 = { name: string }',
				imports: [],
			},
		]
		const exportFiles: string[] = []

		await writeCommonSchema(testDir, schemas, exportFiles)

		const content = await readFile(resolve(testDir, '_schemas.gen.ts'), 'utf8')
		expect(content).toContain('Schema1')
		expect(content).toContain('Schema2')
	})
})
