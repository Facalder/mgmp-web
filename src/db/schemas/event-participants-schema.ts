import {
    index,
    pgTable,
    text,
    timestamp,
    uniqueIndex
} from 'drizzle-orm/pg-core'
import { attendanceStatusEnum } from '@/constants/enums'
import { timestamps } from '@/db/helpers/timestamps'
import { events } from '@/db/schemas/events-schema'
import { users } from '@/db/schemas/users-schema'

export const eventParticipants = pgTable(
    'event_participants',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        event_id: text('event_id')
            .notNull()
            .references(() => events.id, { onDelete: 'cascade' }),
        user_id: text('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        status: attendanceStatusEnum('status').notNull().default('registered'),
        checked_in_at: timestamp('checked_in_at', {
            withTimezone: true,
            mode: 'date'
        }),
        ...timestamps
    },
    table => [
        uniqueIndex('event_participants_event_user_uidx').on(
            table.event_id,
            table.user_id
        ),
        index('event_participants_event_id_idx').on(table.event_id),
        index('event_participants_user_id_idx').on(table.user_id),
        index('event_participants_status_idx').on(table.status)
    ]
)

export type EventParticipant = typeof eventParticipants.$inferSelect
export type NewEventParticipant = typeof eventParticipants.$inferInsert
