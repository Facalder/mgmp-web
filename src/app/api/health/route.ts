import { sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import env from '@/configs/env'
import { redisSecondaryStorage } from '@/configs/redis'
import db from '@/db/connection'
import { logger } from '@/utils/logger'
import { RouteHandler } from '@/utils/route-handler'

export const dynamic = 'force-dynamic'

const RESPONSE_HEADERS = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0'
} as const

const TIMEOUT_MS = 3000

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    let timer: ReturnType<typeof setTimeout>
    const timeout = new Promise<never>((_, reject) => {
        timer = setTimeout(
            () => reject(new Error(`Timeout exceeded (${ms}ms)`)),
            ms
        )
    })
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

async function checkDatabase(): Promise<string> {
    await withTimeout(db.execute(sql`SELECT 1`), TIMEOUT_MS)
    return 'connected'
}

async function checkRedis(): Promise<string> {
    await withTimeout(
        redisSecondaryStorage.set('health_check', 'ok', 5),
        TIMEOUT_MS
    )
    const val = await withTimeout(
        redisSecondaryStorage.get('health_check'),
        TIMEOUT_MS
    )
    return val === 'ok' ? 'connected' : 'fallback_active'
}

export const GET = RouteHandler(async () => {
    const [dbResult, redisResult] = await Promise.allSettled([
        checkDatabase(),
        checkRedis()
    ])

    const dbError =
        dbResult.status === 'rejected' && dbResult.reason instanceof Error
            ? `error: ${dbResult.reason.message}`
            : 'error'

    const dbStatus = dbResult.status === 'fulfilled' ? dbResult.value : dbError

    const redisStatus =
        redisResult.status === 'fulfilled'
            ? redisResult.value
            : 'fallback_active'

    const isHealthy = dbResult.status === 'fulfilled'

    if (dbResult.status === 'rejected') {
        logger.error(
            { err: dbResult.reason },
            '[Health Check] Database connection check failed'
        )
    }

    if (redisResult.status === 'rejected') {
        logger.warn(
            { err: redisResult.reason },
            '[Health Check] Redis check failed, utilizing fallback'
        )
    }

    const mem = process.memoryUsage()
    const cpu = process.cpuUsage()

    const healthData = {
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: Math.round(process.uptime()),
        environment: env.app.nodeEnv,
        database: dbStatus,
        redis: redisStatus,
        memory: {
            used: Math.round((mem.heapUsed / 1024 / 1024) * 100) / 100,
            total: Math.round((mem.heapTotal / 1024 / 1024) * 100) / 100,
            rss: Math.round((mem.rss / 1024 / 1024) * 100) / 100,
            unit: 'MB'
        },
        cpu: {
            user: cpu.user,
            system: cpu.system,
            unit: 'µs'
        }
    }

    return NextResponse.json(
        {
            success: isHealthy,
            message: isHealthy
                ? 'Sistem berjalan dengan normal.'
                : 'Sistem mengalami gangguan.',
            statusCode: isHealthy ? 200 : 503,
            data: healthData
        },
        {
            status: isHealthy ? 200 : 503,
            headers: RESPONSE_HEADERS
        }
    )
})
