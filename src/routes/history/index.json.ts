import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/db/client';

export const get: RequestHandler = async ({ url }) => {
	const allParam = url.searchParams.get('q') === 'all';
	const textList = await prisma.release.findMany({
		...(!allParam && { take: 3 }),
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});

	if (!textList) {
		return {
			status: 404,
			body: new Error('Failed to fetch list.')
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

export const del: RequestHandler = async ({ request }) => {
	const { id } = await request.json();

	const deletedText = await prisma.release.delete({
		where: {
			id: id
		}
	});
	if (!deletedText) {
		return {
			status: 404,
			body: { msg: 'Failed to delete.' }
		};
	}
	return {
		status: 202,
		body: {
			deletedText,
			msg: 'Successfully deleted.'
		}
	};
};
