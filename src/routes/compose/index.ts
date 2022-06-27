import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = ({ url }) => {
	const mood = url.searchParams.get('m');
	return {
		body: { mood }
	};
};
