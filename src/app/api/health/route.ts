import { sql } from 'drizzle-orm'
import type { NextRequest } from 'next/server'
import env from '@/configs/env'
import { redisSecondaryStorage } from '@/configs/redis'
import db from '@/db/connection'
import { ApiResponse } from '@/utils/api-response'
import { RouteHandler } from '@/utils/route-handler'

export const GET = RouteHandler(async (_req: NextRequest) => {
    await db.execute(sql`SELECT 1`)

    await redisSecondaryStorage.set('health_check', 'ok', 5)
    const redisVal = await redisSecondaryStorage.get('health_check')

    const healthData = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: env.app.nodeEnv,
        database: 'connected',
        redis: redisVal === 'ok' ? 'connected' : 'fallback_active',
        memory: {
            used:
                Math.round(
                    (process.memoryUsage().heapUsed / 1024 / 1024) * 100
                ) / 100,
            total:
                Math.round(
                    (process.memoryUsage().heapTotal / 1024 / 1024) * 100
                ) / 100,
            unit: 'MB'
        },
        cpu: {
            usage: process.cpuUsage()
        }
    }

    return ApiResponse.ok('Sistem berjalan dengan normal.', healthData)
})
