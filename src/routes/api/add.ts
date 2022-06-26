import type { RequestHandler } from '@sveltejs/kit';

import { prisma } from '$lib/db/client';

export const post: RequestHandler = async ({ request }) => {
	let body = {};
	const form = await request.formData();
	const { text, mood } = Object.fromEntries(form);

	body = await prisma.release.create({
		data: {
			text,
			mood
		}
	});
	return {
		status: 201,
		body
	};
};
