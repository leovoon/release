import type { RequestHandler } from '@sveltejs/kit';

import { prisma } from '$lib/db/client';

export const POST: RequestHandler = async ({ request }) => {
	const keepAliveApiSecret = process.env.KEEP_ALIVE_API_SECRET;

	const requestHeaderXKeepAlive = request.headers.get(
		'x-keep-alive-api-secret'
	);

	if (keepAliveApiSecret !== requestHeaderXKeepAlive) {
		return {
			status: 403,
			body: {
				error: 'Unauthorized'
			}
		};
	}

	try {
		const happyCount = prisma.release.count({
			where: {
				mood: 'happy'
			}
		});

		const hateCount = prisma.release.count({
			where: {
				mood: 'hate'
			}
		});

		const combinedCount = await prisma.$transaction([happyCount, hateCount]);

		return {
			status: 200,
			body: {
				happyCount: combinedCount[0],
				sadCount: combinedCount[1]
			}
		};
	} catch (e) {
		return {
			status: 500,
			body: 'Database is sleeping. Tell developer to wake it up.'
		};
	}
};
