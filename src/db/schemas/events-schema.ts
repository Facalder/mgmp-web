import {
    boolean,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    varchar
} from 'drizzle-orm/pg-core'
import { eventTypeEnum } from '@/constants/enums'
import { timestamps } from '@/db/helpers/timestamps'
import { users } from '@/db/schemas/users-schema'

export const events = pgTable(
    'events',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        created_by: text('created_by')
            .notNull()
            .references(() => users.id, { onDelete: 'restrict' }),
        title: varchar('title', { length: 200 }).notNull(),
        type: eventTypeEnum('type').notNull(),
        description: text('description'),
        location: varchar('location', { length: 200 }),
        started_at: timestamp('started_at', {
            withTimezone: true,
            mode: 'date'
        }).notNull(),
        ended_at: timestamp('ended_at', {
            withTimezone: true,
            mode: 'date'
        }),
        quota: integer('quota'),
        is_registration_open: boolean('is_registration_open')
            .notNull()
            .default(true),
        ...timestamps
    },
    table => [
        index('events_is_deleted_idx').on(table.is_deleted),
        index('events_started_at_idx').on(table.started_at),
        index('events_type_idx').on(table.type)
    ]
)

export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert
