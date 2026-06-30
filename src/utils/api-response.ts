import { NextResponse } from 'next/server'
import { STATUS_CODES, type StatusCode } from '@/constants/status-codes'

export type PaginationMeta = {
    page: number
    limit: number
    total_items: number
    total_pages: number
}

type ApiResponseParams<T> = {
    success: boolean
    message: string
    statusCode: StatusCode
    data?: T | null
    meta?: PaginationMeta | null
    errors?: unknown
}

export class ApiResponse<T = unknown> {
    public readonly success: boolean
    public readonly message: string
    public readonly statusCode: StatusCode
    public readonly data?: T | null
    public readonly meta?: PaginationMeta | null
    public readonly errors?: unknown

    constructor({
        success,
        message,
        statusCode,
        data = null,
        meta = null,
        errors
    }: ApiResponseParams<T>) {
        this.success = success
        this.message = message
        this.statusCode = statusCode
        this.data = data
        this.meta = meta
        this.errors = errors
    }

    send(): NextResponse {
        return NextResponse.json(
            {
                success: this.success,
                message: this.message,
                statusCode: this.statusCode,
                ...(this.data !== null &&
                    this.data !== undefined && { data: this.data }),
                ...(this.meta !== null &&
                    this.meta !== undefined && { meta: this.meta }),
                ...(this.errors !== null &&
                    this.errors !== undefined && { errors: this.errors })
            },
            { status: this.statusCode }
        )
    }

    static success<T>(
        message: string,
        data?: T,
        statusCode: StatusCode = STATUS_CODES.OK
    ): NextResponse {
        return new ApiResponse<T>({
            success: true,
            message,
            data,
            statusCode
        }).send()
    }

    static ok<T>(message = 'OK', data?: T) {
        return ApiResponse.success(message, data, STATUS_CODES.OK)
    }

    static created<T>(message = 'Created', data?: T) {
        return ApiResponse.success(message, data, STATUS_CODES.CREATED)
    }

    static paginated<T>(
        data: T,
        meta: PaginationMeta,
        message = 'OK'
    ): NextResponse {
        return new ApiResponse<T>({
            success: true,
            message,
            statusCode: STATUS_CODES.OK,
            data,
            meta
        }).send()
    }

    static error(
        message = 'Error',
        errors?: unknown,
        statusCode: StatusCode = STATUS_CODES.INTERNAL_SERVER_ERROR
    ) {
        return new ApiResponse({
            success: false,
            message,
            errors,
            statusCode
        }).send()
    }
}
