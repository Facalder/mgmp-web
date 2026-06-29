import { pgEnum } from 'drizzle-orm/pg-core'

export const ACCOUNT_STATUS_VALUES = [
    'active',
    'inactive',
    'disabled',
    'pending_verification'
] as const

export type AccountStatus = (typeof ACCOUNT_STATUS_VALUES)[number]

export const accountStatusEnum = pgEnum('account_status', ACCOUNT_STATUS_VALUES)

export const ACCOUNT_ROLE_VALUES = ['super_admin', 'admin', 'teacher'] as const

export type AccountRole = (typeof ACCOUNT_ROLE_VALUES)[number]

export const accountRoleEnum = pgEnum('account_role', ACCOUNT_ROLE_VALUES)
