import z from 'zod'

export const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),

    LOG_LEVEL: z
        .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
        .default('info'),

    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string()
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
