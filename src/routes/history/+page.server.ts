import { error } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { prisma } from '$lib/db/client'

export const load: PageServerLoad = async () => {
	const firstQueryResults = await prisma.release.findMany({
		take: 5,
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	})

	const moreMessages = prisma.release.findMany({
		skip: 5,
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	})

	return {
		messages: firstQueryResults,
		streamed: {
			moreMessages
		}
	}
}

export const actions: Actions = {
	deleteHistory: async ({ url }) => {
		const id = Number(url.searchParams.get('id'))

		if (!id) throw error(400, 'Missing id')
		const deletedText = await prisma.release.delete({
			where: {
				id: +id
			}
		})
		if (!deletedText) throw error(400, 'Failed to delete')
	}
}
