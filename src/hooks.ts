import { appAuth } from '$lib/appAuth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { user } = await getSession(event);
	event.locals.user = user;
	return await resolve(event);
};

export const { getSession } = appAuth;
