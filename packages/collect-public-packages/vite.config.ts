import { pakk } from '@alexaegis/vite';
import { builtinModules } from 'node:module';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		target: 'node20',
		ssr: true,
		lib: {
			entry: '',
			formats: ['es'],
		},
		rollupOptions: {
			external: (source: string): boolean => {
				return builtinModules.includes(source) || source.startsWith('node:');
			},
		},
	},
	ssr: {
		target: 'node',
		noExternal: ['@actions/core', '@actions/exec', '@alexaegis/workspace-tools'],
	},
	plugins: [pakk()],
});
