import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
	input: './src/index.ts',
	output: {
		dir: 'dist',
		format: 'esm',
		sourcemap: false,
	},
	external: [
		'@clack/prompts',
		'@orval/core',
		'@zhuh/orval',
		'del',
		'execa',
		'p-limit',
		'picocolors',
	],
	plugins: [
		commonjs(),
		nodeResolve(),
		typescript(),
		replace({
			preventAssignment: true,
			__buildVersion: `'${pkg.version}'`,
		}),
	],
})
