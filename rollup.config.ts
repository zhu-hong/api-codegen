import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import packageJSON from './package.json' with { type: 'json' }

export default defineConfig({
	input: './src/index.ts',
	external: [
		'@clack/prompts',
		'picocolors',
		'@orval/core',
		'execa',
		'orval-effect',
		'p-limit',
	],
	plugins: [
		commonjs(),
		nodeResolve(),
		typescript(),
		replace({
			preventAssignment: true,
			__buildVersion: `'${packageJSON.version}'`,
		}),
	],
	output: {
		dir: 'dist',
		format: 'esm',
		sourcemap: false,
	},
})
