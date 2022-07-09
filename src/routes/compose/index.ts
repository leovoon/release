import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals, url }) => {
	const isLoggedIn = locals.user;
	if (!isLoggedIn) {
		return {
			status: 303,
			headers: {
				location: '/login'
			}
		};
	}

	const mood = url.searchParams.get('m');
	return {
		body: { mood }
	};
};
