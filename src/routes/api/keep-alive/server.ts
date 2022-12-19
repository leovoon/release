import type { RequestHandler } from '@sveltejs/kit'
import { prisma } from '$lib/db/client'
import { KEEP_ALIVE_API_SECRET } from '$env/static/private'

export const POST: RequestHandler = async ({ request }) => {
	const keepAliveApiSecret = KEEP_ALIVE_API_SECRET

	const requestHeaderXKeepAlive = request.headers.get('x-keep-alive-api-secret')

	if (keepAliveApiSecret !== requestHeaderXKeepAlive) {
		return new Response('Unauthorized')
	}

	try {
		const happyCount = prisma.release.count({
			where: {
				mood: 'happy'
			}
		})

		const hateCount = prisma.release.count({
			where: {
				mood: 'hate'
			}
		})

		const combinedCount = await prisma.$transaction([happyCount, hateCount])
		const [happy, hate] = combinedCount

		await prisma.release.create({
			data: {
				text: `Happy: ${happy}, Hate: ${hate}`,
				mood: happy > hate ? 'happy' : 'hate'
			}
		})
	} catch (e) {
		return new Response('Failed to execute keep-alive')
	}

	return new Response('Keep-alive executed')
}
