import { NextResponse } from 'next/server'
import z, { ZodError } from 'zod'
import env from '@/configs/env'
import { STATUS_CODES } from '@/constants/status-codes'
import { ApiError, ErrorCode } from '@/utils/api-error'
import { logger } from '@/utils/logger'

export function handleError(error: unknown) {
    const errorId =
        typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `err_${Math.random().toString(36).substring(2, 15)}`

    const timestamp = new Date().toISOString()
    const isDev = env.app.nodeEnv === 'development'

    let apiError: ApiError

    if (error instanceof ZodError) {
        apiError = ApiError.validation(
            'Data yang Anda masukkan tidak lengkap atau tidak sesuai.',
            z.flattenError(error)
        )
    } else if (error instanceof ApiError) {
        apiError = error
    } else {
        const message =
            error instanceof Error
                ? error.message
                : 'Terjadi kesalahan pada sistem.'
        apiError = ApiError.server(message, false)
    }

    const logData = {
        errorId,
        statusCode: apiError.statusCode,
        code: apiError.code,
        isOperational: apiError.isOperational,
        err: error
    }

    if (apiError.statusCode >= 500 || !apiError.isOperational) {
        logger.error(logData, `[API Error] ${apiError.message}`)
    } else {
        logger.warn(logData, `[Client Warning] ${apiError.message}`)
    }

    if (isDev) {
        return NextResponse.json(
            {
                success: false,
                statusCode: apiError.statusCode,
                code: apiError.code,
                message: apiError.message,
                errors: apiError.errors ?? null,
                errorId,
                timestamp,
                stack: apiError.stack,
                details:
                    error instanceof Error
                        ? {
                              name: error.name,
                              message: error.message,
                              stack: error.stack
                          }
                        : String(error)
            },
            { status: apiError.statusCode }
        )
    }

    const isOperational = apiError.isOperational && apiError.statusCode < 500

    return NextResponse.json(
        {
            success: false,
            statusCode: isOperational
                ? apiError.statusCode
                : STATUS_CODES.INTERNAL_SERVER_ERROR,
            code: isOperational ? apiError.code : ErrorCode.INTERNAL_ERROR,
            message: isOperational
                ? apiError.message
                : `Terjadi kesalahan pada sistem. Silakan catat kode referensi berikut dan hubungi admin: ${errorId}`,
            errors: isOperational ? (apiError.errors ?? null) : null,
            errorId,
            timestamp
        },
        {
            status: isOperational
                ? apiError.statusCode
                : STATUS_CODES.INTERNAL_SERVER_ERROR
        }
    )
}
