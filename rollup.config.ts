import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
	input: './src/index.ts',
	external: [
		'@clack/prompts',
		'picocolors',
		'@orval/core',
		'execa',
		'orval',
		'orval-effect',
	],
	plugins: [commonjs(), nodeResolve(), typescript()],
	output: {
		dir: 'dist',
		format: 'esm',
		sourcemap: false,
	},
})
