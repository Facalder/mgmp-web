import { boolean, index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { accountRoleEnum, accountStatusEnum } from '@/constants/enums'
import { timestamps } from '@/db/helpers/timestamps'

export const users = pgTable(
    'users',
    {
        id: text('id').primaryKey(),

        name: varchar('name', { length: 100 }).notNull(),
        email: varchar('email', { length: 255 }).notNull().unique(),
        email_verified: boolean('email_verified').notNull().default(false),
        phone_number: varchar('phone_number', { length: 20 }).unique(),
        avatar_url: text('avatar_url'),

        role: accountRoleEnum('role').notNull().default('teacher'),
        status: accountStatusEnum('status').notNull().default('active'),

        ...timestamps
    },
    table => [
        index('users_is_deleted_idx').on(table.is_deleted),
        index('users_email_status_idx').on(table.email, table.status),
        index('users_role_status_idx').on(table.role, table.status),
        index('users_phone_status_idx').on(table.phone_number, table.status)
    ]
)

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
