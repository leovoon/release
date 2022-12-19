import lucia from 'lucia-auth'
import { dev } from '$app/environment'
import prismaAdapter from '@lucia-auth/adapter-prisma'
import { prisma } from '$lib/db/client'

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	transformUserData(userData) {
		return {
			userId: userData.id,
			username: userData.username
		}
	}
})

export type Auth = typeof auth
