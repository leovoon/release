import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals, params }) => {
	const isLoggedIn = locals.user;
	if (!isLoggedIn) {
		return {
			status: 303,
			headers: {
				location: '/login'
			}
		};
	}

	const mood = params.m;
	return {
		body: { mood },
		headers: {
			'Cache-Control': 's-maxage=36000, stale-while-revalidate=0'
		}
	};
};
