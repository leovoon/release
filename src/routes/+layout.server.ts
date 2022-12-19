import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoadEvent } from './$types'
import { handleServerSession } from '@lucia-auth/sveltekit'

export const load = handleServerSession(
	async (event: LayoutServerLoadEvent) => {
		const session = await event.locals.validateUser()

		if (!session) throw redirect(302, '/')
		return {}
	}
)
