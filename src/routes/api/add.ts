import type { RequestHandler } from '@sveltejs/kit';

import { prisma } from '$lib/db/client';

export const post: RequestHandler = async ({ request }) => {
	let body = {};
	const text = (await request.formData()).get('text')?.toString();
	const type = (await request.formData()).get('mood')?.toString();
	if (text && type)
		body = await prisma.release.create({
			data: {
				text,
				type
			}
		});
	return {
		status: 201,
		body
	};
};
