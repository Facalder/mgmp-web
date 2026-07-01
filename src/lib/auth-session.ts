import { headers } from 'next/headers'
import { redirect, unstable_rethrow } from 'next/navigation'
import { auth } from '@/lib/auth'
import { logger } from '@/utils/logger'

export async function getSession() {
    return auth.api.getSession({ headers: await headers() })
}

export async function requireSession() {
    try {
        const session = await getSession()

        if (!session?.user || !session.session) {
            redirect('/login')
        }

        if (!session.user.emailVerified) {
            redirect('/login?error=EmailNotVerified')
        }

        return session
    } catch (error) {
        unstable_rethrow(error)
        logger.error({ error }, 'Session validation error')
        redirect('/login')
    }
}
