import type { RequestHandler } from '@sveltejs/kit';

import { prisma } from '$lib/db/client';

export const POST: RequestHandler = async ({ request, params }) => {
	let createdText = {};
	const form = await request.formData();
	const text = form.get('text')?.toString();
	const mood = params.mood;

	if (text && mood) {
		createdText = await prisma.release.create({
			data: {
				text,
				mood
			}
		});
	}

	if (!createdText) {
		return {
			status: 404,
			error: 'Error saving'
		};
	}

	return {
		status: 201,
		body: { createdText }
	};
};
