import { bool, createEnv, num, str, url } from 'next-safe-env'

const rawEnv = createEnv({
    adapter: 'nextjs',
    server: {
        NODE_ENV: str()
            .enum(['development', 'test', 'production'])
            .default('development'),
        LOG_LEVEL: str()
            .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
            .default('info'),

        UPSTASH_REDIS_REST_URL: url(),
        UPSTASH_REDIS_REST_TOKEN: str().min(1),
        REDIS_PREFIX: str().optional(),

        DATABASE_URL: url(),

        BETTER_AUTH_SECRET: str().min(32),
        BETTER_AUTH_URL: url(),
        TRUSTED_ORIGIN: url(),

        SESSION_EXPIRES_IN: num().default(604800),
        SESSION_UPDATE_AGE: num().default(86400),
        SESSION_COOKIE_CACHE_ENABLED: bool().default(true),
        SESSION_COOKIE_CACHE_MAX_AGE: num().default(300),

        OTP_LENGTH: num().default(6),
        OTP_EXPIRES_IN: num().default(600)
    },
    client: {
        NEXT_PUBLIC_API_URL: url(),
        NEXT_PUBLIC_APP_NAME: str().default('My App')
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        LOG_LEVEL: process.env.LOG_LEVEL,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
        REDIS_PREFIX: process.env.REDIS_PREFIX,
        DATABASE_URL: process.env.DATABASE_URL,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
        SESSION_EXPIRES_IN: process.env.SESSION_EXPIRES_IN,
        SESSION_UPDATE_AGE: process.env.SESSION_UPDATE_AGE,
        SESSION_COOKIE_CACHE_ENABLED: process.env.SESSION_COOKIE_CACHE_ENABLED,
        SESSION_COOKIE_CACHE_MAX_AGE: process.env.SESSION_COOKIE_CACHE_MAX_AGE,
        OTP_LENGTH: process.env.OTP_LENGTH,
        OTP_EXPIRES_IN: process.env.OTP_EXPIRES_IN,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME
    },
    skipValidation:
        process.env.SKIP_ENV_VALIDATION === 'true' || process.env.CI === 'true'
})

export const env = {
    app: {
        nodeEnv: rawEnv.NODE_ENV,
        logLevel: rawEnv.LOG_LEVEL || 'info'
    },
    redis: {
        url: rawEnv.UPSTASH_REDIS_REST_URL,
        token: rawEnv.UPSTASH_REDIS_REST_TOKEN,
        prefix: rawEnv.REDIS_PREFIX ?? `${rawEnv.NODE_ENV}:mgmp:`
    },
    db: {
        url: rawEnv.DATABASE_URL
    },
    client: {
        nextPublicUrl: rawEnv.NEXT_PUBLIC_API_URL,
        nextPublicAppName: rawEnv.NEXT_PUBLIC_APP_NAME
    },
    auth: {
        secret: rawEnv.BETTER_AUTH_SECRET,
        url: rawEnv.BETTER_AUTH_URL,
        trustedOrigin: rawEnv.TRUSTED_ORIGIN,
        otpLength: rawEnv.OTP_LENGTH,
        otpExpiresIn: rawEnv.OTP_EXPIRES_IN
    },
    session: {
        expiresIn: rawEnv.SESSION_EXPIRES_IN,
        updateAge: rawEnv.SESSION_UPDATE_AGE,
        cookieCacheEnabled: rawEnv.SESSION_COOKIE_CACHE_ENABLED,
        cookieCacheMaxAge: rawEnv.SESSION_COOKIE_CACHE_MAX_AGE
    }
} as const

export default env
