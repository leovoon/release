import { error, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { prisma } from '$lib/db/client'

export const load: PageServerLoad = async ({ setHeaders }) => {
	const firstQueryResults = await prisma.release.findMany({
		take: 4,
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	})

	return {
		messages: firstQueryResults,
		nextResultCursor: firstQueryResults[3].id
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
	},

	getPreviousHistory: async ({ url }) => {
		const cursor = Number(url.searchParams.get('p'))
		const nextQueryResults = await prisma.release.findMany({
			take: 4,
			skip: 1,
			cursor: {
				id: cursor
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
		const myCursor = nextQueryResults[3]?.id
		if (!myCursor) return fail(400)

		return {
			messages: nextQueryResults,
			nextPage: myCursor
		}
	}
}
