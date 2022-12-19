import adapter from '@sveltejs/adapter-netlify'
import preprocess from 'svelte-preprocess'

const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		version: {
			name: 'v0.1.0'
		}
	}
}

export default config
