import { fail, redirect } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import type { PageServerLoad, Actions } from './$types'

// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	// on page load, check if the user is authenticated
	const session = await locals.validate()
	if (session) throw redirect(302, '/')
	return {}
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		// get the username and password from the request
		const form = await request.formData()
		const username = form.get('username')
		const password = form.get('password')

		// check for empty values
		if (
			!username ||
			!password ||
			typeof username !== 'string' ||
			typeof password !== 'string'
		) {
			return fail(400)
		}

		// create the user to the database
		try {
			const user = await auth.createUser('username', username, {
				password,
				attributes: {
					username
				}
			})
			// create a session for the user
			const session = await auth.createSession(user.userId)

			// set the session in the locals
			locals.setSession(session)
		} catch {
			// username already in use
			return fail(400)
		}
	}
}
