//import adapter from '@sveltejs/adapter-auto';
import adapter from 'svelte-adapter-bun';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			out: 'build',
			serveAssets: true,
			precompress: true
		})
	}
};

export default config;
