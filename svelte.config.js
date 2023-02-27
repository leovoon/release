import adapter from '@sveltejs/adapter-netlify'
import { vitePreprocess } from '@sveltejs/kit/vite'

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		version: {
			name: 'v0.1.0'
		}
	}
}

export default config
