import adapter from '@sveltejs/adapter-netlify@1.0.0-next.65';
import preprocess from 'svelte-preprocess';

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
		prerender: {
			default: false
		}
	}
};

export default config;
