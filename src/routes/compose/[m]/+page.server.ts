import type { PageServerLoad } from './$types'
import { prisma } from '$lib/db/client'
import { error, fail, type Actions } from '@sveltejs/kit'
import { TINY_API_KEY } from '$env/static/private'

export const load: PageServerLoad = () => {
	return {
		apiKey: TINY_API_KEY
	}
}

export const actions: Actions = {
	addMessage: async ({ params, request }) => {
		const mood = params.m
		const moodText = (await request.formData()).get('moodText') as string

		if (!mood || !moodText) {
			return fail(400, { missing: 'No empty content.' })
		}
		const result = await prisma.release.create({
			data: {
				text: moodText,
				mood
			}
		})
		if (!result) throw error(500, 'Failed to add message')
	}
}
