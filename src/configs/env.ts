import z from 'zod'

export const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'], {
            error: "NODE_ENV must be 'development', 'test', or 'production'"
        })
        .default('development'),

    LOG_LEVEL: z
        .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'], {
            error: "LOG_LEVEL must be one of: 'fatal', 'error', 'warn', 'info', 'debug', 'trace'"
        })
        .default('info'),

    UPSTASH_REDIS_REST_URL: z.url({
        error: 'UPSTASH_REDIS_REST_URL must be a valid URL'
    }),
    UPSTASH_REDIS_REST_TOKEN: z
        .string({ error: 'UPSTASH_REDIS_REST_TOKEN is required' })
        .min(1, { error: 'UPSTASH_REDIS_REST_TOKEN must not be empty' }),

    DATABASE_URL: z.url({
        error: 'DATABASE_URL must be a valid PostgreSQL connection URL'
    }),

    BETTER_AUTH_SECRET: z
        .string({ error: 'BETTER_AUTH_SECRET is required' })
        .min(32, {
            error: 'BETTER_AUTH_SECRET must be at least 32 characters'
        }),
    BETTER_AUTH_URL: z.url({
        error: 'BETTER_AUTH_URL must be a valid URL (e.g. http://localhost:3000)'
    })
})

export type Env = z.infer<typeof envSchema>

const result = envSchema.safeParse(process.env)

if (!result.success) {
    console.error('❌ Invalid environment configuration')
    console.error(z.prettifyError(result.error))
    process.exit(1)
}

export const env: Readonly<Env> = Object.freeze(result.data)

export default env
