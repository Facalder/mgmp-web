import { NextResponse } from 'next/server'
import z, { ZodError } from 'zod'
import { STATUS_CODES } from '@/constants/status-codes'
import { ApiError } from '@/utils/api-error'
import { logger } from '@/utils/logger'

export function handleError(error: unknown) {
    logger.error(error)
    if (error instanceof ZodError) {
        return ApiError.badRequest(
            'Invalid request data',
            z.flattenError(error)
        )
    }

    if (error instanceof ApiError) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                statusCode: error.statusCode,
                ...(Array.isArray(error.errors) && { errors: error.errors }),
                ...(process.env.NODE_ENV === 'development' && {
                    stack: error.stack
                })
            },
            { status: error.statusCode }
        )
    }

    return NextResponse.json(
        {
            success: false,
            message: 'Internal Server Error',
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR
        },
        { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    )
}
