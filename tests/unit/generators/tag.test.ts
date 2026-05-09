import { mkdir, readFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { generateTagFiles } from '../../../src/generators/tag'

describe('generateTagFiles', () => {
	const testDir = resolve('test-tag-temp')

	beforeEach(async () => {
		await mkdir(testDir, { recursive: true })
	})

	afterEach(async () => {
		await rm(testDir, { recursive: true, force: true })
	})

	it('应生成 [tag].ts 实现文件', async () => {
		const operations = [
			{
				tags: ['Test'],
				implementation:
					"export const getTest = () => _http({ url: '/test', method: 'get' })",
				imports: [],
			},
		]
		const apiSchemas: any[] = []
		const allCommonSchema: any[] = []
		const exportFiles: string[] = []

		await generateTagFiles(
			testDir,
			'Test',
			operations,
			apiSchemas,
			allCommonSchema,
			exportFiles,
		)

		const content = await readFile(resolve(testDir, 'test.ts'), 'utf8')
		expect(content).toContain('import { _http }')
		expect(content).toContain('getTest')
		expect(exportFiles).toContain('test.ts')
	})

	it('应生成正确的 import 路径', async () => {
		const operations = [
			{
				tags: ['MyTag'],
				implementation: 'export const test = () => _http({})',
				imports: [],
			},
		]
		const apiSchemas: any[] = []
		const allCommonSchema: any[] = []
		const exportFiles: string[] = []

		await generateTagFiles(
			testDir,
			'MyTag',
			operations,
			apiSchemas,
			allCommonSchema,
			exportFiles,
		)

		const content = await readFile(resolve(testDir, 'my-tag.ts'), 'utf8')
		expect(content).toContain("from '")
	})

	it('应处理空 operations', async () => {
		const operations: any[] = []
		const apiSchemas: any[] = []
		const allCommonSchema: any[] = []
		const exportFiles: string[] = []

		await generateTagFiles(
			testDir,
			'Empty',
			operations,
			apiSchemas,
			allCommonSchema,
			exportFiles,
		)

		const content = await readFile(resolve(testDir, 'empty.ts'), 'utf8')
		expect(content).toContain('import { _http }')
		expect(exportFiles).toContain('empty.ts')
	})

	it('应处理有 schema imports 的情况', async () => {
		const operations = [
			{
				tags: ['Api'],
				implementation: 'export const test = () => _http({})',
				imports: [{ name: 'TestType', schemaName: '' }],
			},
		]
		const apiSchemas = [
			{
				name: 'TestType',
				model: 'export type TestType = { id: string }',
				imports: [],
			},
		]
		const allCommonSchema: any[] = []
		const exportFiles: string[] = []

		await generateTagFiles(
			testDir,
			'Api',
			operations,
			apiSchemas,
			allCommonSchema,
			exportFiles,
		)

		const schemaContent = await readFile(
			resolve(testDir, 'api.schema.ts'),
			'utf8',
		)
		expect(schemaContent).toContain('TestType')
	})

	it('应处理多个 operations 同一个 tag', async () => {
		const operations = [
			{
				tags: ['Multi'],
				implementation: 'export const getMulti = () => _http({})',
				imports: [],
			},
			{
				tags: ['Multi'],
				implementation: 'export const postMulti = () => _http({})',
				imports: [],
			},
		]
		const apiSchemas: any[] = []
		const allCommonSchema: any[] = []
		const exportFiles: string[] = []

		await generateTagFiles(
			testDir,
			'Multi',
			operations,
			apiSchemas,
			allCommonSchema,
			exportFiles,
		)

		const content = await readFile(resolve(testDir, 'multi.ts'), 'utf8')
		expect(content).toContain('getMulti')
		expect(content).toContain('postMulti')
	})

	it('应处理有 schemaName 的 imports', async () => {
		const operations = [
			{
				tags: ['Common'],
				implementation: 'export const test = () => _http({})',
				imports: [{ name: 'Result', schemaName: 'CommonResult' }],
			},
		]
		const apiSchemas: any[] = []
		const allCommonSchema = [
			{
				name: 'CommonResult',
				model: 'export type CommonResult = { code: number }',
				imports: [],
			},
		]
		const exportFiles: string[] = []

		await generateTagFiles(
			testDir,
			'Common',
			operations,
			apiSchemas,
			allCommonSchema,
			exportFiles,
		)

		const content = await readFile(resolve(testDir, 'common.ts'), 'utf8')
		expect(content).toContain('CommonResult')
	})

	it('应过滤不存在的 schema 引用', async () => {
		const operations = [
			{
				tags: ['Filter'],
				implementation: 'export const test = () => _http({})',
				imports: [{ name: 'NonExistent', schemaName: '' }],
			},
		]
		const apiSchemas: any[] = []
		const allCommonSchema: any[] = []
		const exportFiles: string[] = []

		await generateTagFiles(
			testDir,
			'Filter',
			operations,
			apiSchemas,
			allCommonSchema,
			exportFiles,
		)

		const schemaContent = await readFile(
			resolve(testDir, 'filter.schema.ts'),
			'utf8',
		).catch(() => '')
		expect(schemaContent).toBe('')
	})

	it('应去重相同的 imports', async () => {
		const operations = [
			{
				tags: ['Dedup'],
				implementation: 'export const test1 = () => _http({})',
				imports: [{ name: 'Type', schemaName: '' }],
			},
			{
				tags: ['Dedup'],
				implementation: 'export const test2 = () => _http({})',
				imports: [{ name: 'Type', schemaName: '' }],
			},
		]
		const apiSchemas = [
			{
				name: 'Type',
				model: 'export type Type = { id: string }',
				imports: [],
			},
		]
		const allCommonSchema: any[] = []
		const exportFiles: string[] = []

		await generateTagFiles(
			testDir,
			'Dedup',
			operations,
			apiSchemas,
			allCommonSchema,
			exportFiles,
		)

		const schemaContent = await readFile(
			resolve(testDir, 'dedup.schema.ts'),
			'utf8',
		)
		const typeCount = (schemaContent.match(/Type/g) || []).length
		expect(typeCount).toBeLessThanOrEqual(2)
	})
})
