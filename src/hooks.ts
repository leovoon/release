import { appAuth } from '$lib/appAuth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { user } = await getSession(event);
	event.locals.user = user;
	// if (
	// 	event.url.pathname.startsWith(
	// 		'/compose' || event.url.pathname.startsWith('/history')
	// 	)
	// ) {
	// 	if (!user) {
	// 		return Response.redirect(`${event.url.origin}/login`, 303);
	// 	}
	// 	return await resolve(event);
	// }
	return await resolve(event);
};

export const { getSession } = appAuth;
