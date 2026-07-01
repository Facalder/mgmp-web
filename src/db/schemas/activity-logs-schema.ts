import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { activityActionEnum } from '@/constants/enums'
import { users } from '@/db/schemas/users-schema'

export const activityLogs = pgTable(
    'activity_logs',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        user_id: text('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        action: activityActionEnum('action').notNull(),
        metadata: text('metadata'),
        created_at: timestamp('created_at', {
            withTimezone: true,
            mode: 'date'
        })
            .defaultNow()
            .notNull()
    },
    table => [
        index('activity_logs_user_id_idx').on(table.user_id),
        index('activity_logs_action_idx').on(table.action),
        index('activity_logs_created_at_idx').on(table.created_at)
    ]
)

export type ActivityLog = typeof activityLogs.$inferSelect
export type NewActivityLog = typeof activityLogs.$inferInsert
