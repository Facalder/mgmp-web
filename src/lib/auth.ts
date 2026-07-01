import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import {
    bearer,
    emailOTP,
    haveIBeenPwned,
    multiSession,
    openAPI
} from 'better-auth/plugins'
import env from '@/configs/env'
import { redisSecondaryStorage } from '@/configs/redis'
import * as schema from '@/db'
import db from '@/db/connection'
import { logger } from '@/utils/logger'

export const auth = betterAuth({
    appName: env.client.nextPublicAppName,
    baseUrl: env.auth.url,
    trustedOrigins: [env.auth.trustedOrigin],
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            user: schema.users,
            session: schema.sessions,
            account: schema.accounts,
            verification: schema.verifications
        }
    }),
    secondaryStorage: redisSecondaryStorage,
    advanced: {
        defaultCookieAttributes: {
            sameSite: env.app.nodeEnv === 'production' ? 'none' : 'lax',
            secure: env.app.nodeEnv === 'production',
            httpOnly: true,
            path: '/'
        }
    },
    rateLimit: {
        window: 60,
        max: 5,
        customSecondaryStorage: redisSecondaryStorage
    },
    onAPIError: {
        onError(error) {
            logger.error({ error }, 'Better Auth API Error')
        }
    },
    plugins: [
        nextCookies(),
        bearer(),
        emailOTP({
            expiresIn: env.auth.otpExpiresIn,
            otpLength: env.auth.otpLength,
            sendVerificationOnSignUp: true,
            storeOTP: 'encrypted',
            overrideDefaultEmailVerification: true,
            // biome-ignore lint/correctness/noUnusedFunctionParameters: <d>
            async sendVerificationOTP({ email, otp, type }, request) {
                // await EmailService.sendVerificationOTP(email, otp, type)
            }
        }),
        haveIBeenPwned(),
        multiSession({
            maximumSessions: 5
        }),
        openAPI()
    ],
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
        minPasswordLength: 12,
        maxPasswordLength: 128,
        // biome-ignore lint/correctness/noUnusedFunctionParameters: <d>
        sendResetPassword: async ({ user, url, token }, request) => {
            // await EmailService.sendResetPasswordLink(user.email, url)
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: false,
        sendOnSignIn: true,
        sendVerificationEmail: async ({ user }, _request) => {
            await auth.api.sendVerificationOTP({
                body: {
                    email: user.email,
                    type: 'email-verification'
                }
            })
        }
    },
    user: {
        fields: {
            image: 'avatar_url',
            emailVerified: 'email_verified',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        additionalFields: {
            role: { type: 'string', defaultValue: 'teacher' },
            status: { type: 'string', defaultValue: 'active' }
        }
    },
    session: {
        expiresIn: env.session.expiresIn,
        updateAge: env.session.updateAge,
        cookieCache: {
            enabled: env.session.cookieCacheEnabled,
            maxAge: env.session.cookieCacheMaxAge
        },
        fields: {
            expiresAt: 'expires_at',
            ipAddress: 'ip_address',
            userAgent: 'user_agent',
            userId: 'user_id',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    account: {
        fields: {
            accountId: 'account_id',
            providerId: 'provider_id',
            userId: 'user_id',
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
            idToken: 'id_token',
            accessTokenExpiresAt: 'access_token_expires_at',
            refreshTokenExpiresAt: 'refresh_token_expires_at',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    verification: {
        fields: {
            expiresAt: 'expires_at',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
})
