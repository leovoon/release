import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/db/client';

export const get: RequestHandler = async () => {
	const textList = await prisma.release.findMany({
		take: 3,
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});

	if (!textList) {
		return {
			status: 404,
			body: { message: 'something went wrong' }
		};
	}

	return {
		status: 200,
		body: { textList },
		headers: {
			'cache-control': 's-maxage-1, stale-while-revalidate=5'
		}
	};
};

export const post: RequestHandler = async ({ url }) => {
	let nextList;
	const q = url.searchParams.get('q');
	if (q)
		nextList = await prisma.release.findMany({
			skip: 3,
			orderBy: [
				{
					createdAt: 'desc'
				}
			]
		});

	return {
		status: 200,
		body: { nextList },
		headers: {
			'cache-control': 's-maxage-1, stale-while-revalidate=5'
		}
	};
};
