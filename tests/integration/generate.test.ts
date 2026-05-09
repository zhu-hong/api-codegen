import { access, readFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockOperations = {
	'test-get': {
		tags: ['Test'],
		implementation:
			"export const getTest = () => _http({ url: '/test', method: 'get' })",
		imports: [],
	},
	'test-post': {
		tags: ['Test'],
		implementation:
			"export const postTest = (data) => _http({ url: '/test', method: 'post', data })",
		imports: [],
	},
	'item-get': {
		tags: ['Item'],
		implementation:
			"export const getItem = (id) => _http({ url: `/item/${id}`, method: 'get' })",
		imports: [],
	},
}

const mockSchemas = [
	{
		name: 'Result',
		model: 'export type Result = { code: number; message: string }',
		imports: [],
	},
]

vi.mock('@zhuh/orval', () => ({
	_effect_getApiBuilder: vi.fn(() => ({
		operations: mockOperations,
		schemas: mockSchemas,
	})),
	applyTransformer: vi.fn((spec) => spec),
	getApiSchemas: vi.fn(() => mockSchemas),
	normalizeOptions: vi.fn((config) => ({
		input: {
			target: config.input,
			parserOptions: {},
			override: { transformer: null },
		},
		output: config.output,
	})),
	resolveSpec: vi.fn((_target) => ({
		paths: {},
		components: { schemas: {} },
	})),
}))

vi.mock('@orval/core', () => ({
	isString: vi.fn((val) => typeof val === 'string'),
	kebab: vi.fn((str) => str.toLowerCase().replace(/\s+/g, '-')),
}))

const testDir = 'src/api/test-simple'
const fixturePath = resolve(__dirname, '../fixtures/simple.json')

beforeEach(async () => {
	await rm(resolve(testDir), { recursive: true, force: true })
})

afterEach(async () => {
	await rm(resolve(testDir), { recursive: true, force: true })
	vi.clearAllMocks()
})

describe('generateAPIFile', () => {
	it('应成功生成 API 文件', async () => {
		const { generateAPIFile } = await import('@/generators')

		await generateAPIFile(
			{
				definition: 'test-simple',
				address: fixturePath,
			},
			false,
		)

		const exportExists = await access(resolve(testDir, '_export.ts'))
			.then(() => true)
			.catch(() => false)
		expect(exportExists).toBe(true)
	})

	it('应生成正确的导出文件', async () => {
		const { generateAPIFile } = await import('@/generators')

		await generateAPIFile(
			{
				definition: 'test-simple',
				address: fixturePath,
			},
			false,
		)

		const exportContent = await readFile(resolve(testDir, '_export.ts'), 'utf8')
		expect(exportContent).toContain('export *')
	})

	it('应为不同的 tags 生成独立文件', async () => {
		const { generateAPIFile } = await import('@/generators')

		await generateAPIFile(
			{
				definition: 'test-simple',
				address: fixturePath,
			},
			false,
		)

		const testTagExists = await access(resolve(testDir, 'test.ts'))
			.then(() => true)
			.catch(() => false)

		const itemTagExists = await access(resolve(testDir, 'item.ts'))
			.then(() => true)
			.catch(() => false)

		expect(testTagExists).toBe(true)
		expect(itemTagExists).toBe(true)
	})

	it('应生成 _schemas.gen.ts 文件', async () => {
		const { generateAPIFile } = await import('@/generators')

		await generateAPIFile(
			{
				definition: 'test-simple',
				address: fixturePath,
			},
			false,
		)

		const schemasExists = await access(resolve(testDir, '_schemas.gen.ts'))
			.then(() => true)
			.catch(() => false)
		expect(schemasExists).toBe(true)
	})

	it('应生成可读的 TypeScript 代码', async () => {
		const { generateAPIFile } = await import('@/generators')

		await generateAPIFile(
			{
				definition: 'test-simple',
				address: fixturePath,
			},
			false,
		)

		const testContent = await readFile(resolve(testDir, 'test.ts'), 'utf8')
		expect(testContent).toContain('import')
		expect(testContent).toContain('export')
	})
})
