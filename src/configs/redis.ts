import { Redis } from '@upstash/redis'
import env from '@/configs/env'

const globalForRedis = globalThis as unknown as {
    redis: Redis | undefined
}

export const redis =
    globalForRedis.redis ??
    new Redis({
        url: env.redis.url,
        token: env.redis.token,
        retry: {
            retries: 3,
            backoff: retryCount => Math.min(retryCount * 200, 2000)
        }
    })

if (env.app.nodeEnv !== 'production') {
    globalForRedis.redis = redis
}

export const REDIS_PREFIX = env.redis.prefix

export function getPrefixedKey(key: string): string {
    if (key.startsWith(REDIS_PREFIX)) {
        return key
    }
    return `${REDIS_PREFIX}${key}`
}

const CIRCUIT = {
    failures: 0,
    open: false,
    lastFailureTime: 0,
    FAILURE_THRESHOLD: 5,
    RESET_AFTER_MS: 30_000
}

function checkCircuitState() {
    if (CIRCUIT.open) {
        const now = Date.now()
        if (now - CIRCUIT.lastFailureTime > CIRCUIT.RESET_AFTER_MS) {
            CIRCUIT.open = false
            CIRCUIT.failures = 0
            console.info(
                '[Redis] Circuit breaker half-open: retrying connection'
            )
        }
    }
}

function recordFailure() {
    CIRCUIT.failures++
    CIRCUIT.lastFailureTime = Date.now()
    if (CIRCUIT.failures >= CIRCUIT.FAILURE_THRESHOLD && !CIRCUIT.open) {
        CIRCUIT.open = true
        console.warn(
            `[Redis] Circuit breaker OPEN — Redis unreachable. Fallback active for next ${CIRCUIT.RESET_AFTER_MS / 1000}s.`
        )
    }
}

function recordSuccess() {
    CIRCUIT.failures = 0
    if (CIRCUIT.open) {
        CIRCUIT.open = false
        console.info('[Redis] Circuit breaker CLOSED — Redis recovered')
    }
}

interface MemEntry {
    value: string
    expiresAt: number | null
}
const memCache = new Map<string, MemEntry>()

const mem = {
    get(key: string): string | null {
        const entry = memCache.get(key)
        if (!entry) return null
        if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
            memCache.delete(key)
            return null
        }
        return entry.value
    },
    set(key: string, value: string, ttlSeconds?: number): void {
        memCache.set(key, {
            value,
            expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null
        })
    },
    delete(key: string): void {
        memCache.delete(key)
    }
}

export const redisSecondaryStorage = {
    get: async <T = string>(key: string): Promise<T | null> => {
        const fullKey = getPrefixedKey(key)
        checkCircuitState()

        if (CIRCUIT.open) {
            const val = mem.get(fullKey)
            if (!val) return null
            try {
                return JSON.parse(val) as T
            } catch {
                return val as unknown as T
            }
        }

        try {
            const result = await redis.get<T>(fullKey)
            recordSuccess()
            if (result !== null && result !== undefined) {
                mem.set(
                    fullKey,
                    typeof result === 'string' ? result : JSON.stringify(result)
                )
                return result
            }

            const val = mem.get(fullKey)
            if (!val) return null
            try {
                return JSON.parse(val) as T
            } catch {
                return val as unknown as T
            }
        } catch {
            recordFailure()
            const val = mem.get(fullKey)
            if (!val) return null
            try {
                return JSON.parse(val) as T
            } catch {
                return val as unknown as T
            }
        }
    },

    set: async (
        key: string,
        value: unknown,
        expirySeconds?: number
    ): Promise<void> => {
        const fullKey = getPrefixedKey(key)
        const stringValue =
            typeof value === 'string' ? value : JSON.stringify(value)
        mem.set(fullKey, stringValue, expirySeconds)

        checkCircuitState()
        if (CIRCUIT.open) return

        try {
            if (expirySeconds) {
                await redis.set(fullKey, value, { ex: expirySeconds })
            } else {
                await redis.set(fullKey, value)
            }
            recordSuccess()
        } catch {
            recordFailure()
        }
    },

    delete: async (key: string): Promise<void> => {
        const fullKey = getPrefixedKey(key)
        mem.delete(fullKey)

        checkCircuitState()
        if (CIRCUIT.open) return

        try {
            await redis.del(fullKey)
            recordSuccess()
        } catch {
            recordFailure()
        }
    }
}

export default redis
