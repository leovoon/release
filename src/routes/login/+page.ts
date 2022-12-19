import { redirect } from '@sveltejs/kit'
export const load = ({ session }: Session) => {
	const { user } = session

	// if user exists, redirect to homepage
	if (user) {
		throw redirect(302, '/')
	}

	return {}
}
