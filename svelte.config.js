import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import mkcert from 'vite-plugin-mkcert';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		methodOverride: {
			allowed: ['PUT', 'PATCH', 'DELETE']
		},
		vite: () => ({
			server: { https: true },
			plugins: [mkcert()]
		})
	}
};

export default config;
