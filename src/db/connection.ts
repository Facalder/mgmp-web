import { neonConfig, Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import ws from 'ws'
import env from '@/configs/env'
import { relations } from '@/db/relations'

neonConfig.webSocketConstructor = ws

const pool = new Pool({
    connectionString: env.db.url,
    max: 5,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000
})

const db = drizzle({
    client: pool,
    relations,
    logger: env.app.nodeEnv === 'development'
})

export default db
