import { defineConfig } from 'drizzle-kit'
import env from '@/configs/env'

export default defineConfig({
    out: './migrations',
    schema: './src/db/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.db.url
    },
    verbose: true,
    strict: true
})
