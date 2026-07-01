import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { certificateStatusEnum } from '@/constants/enums'
import { eventParticipants } from '@/db/schemas/event-participants-schema'

export const certificates = pgTable(
    'certificates',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        event_participant_id: text('event_participant_id')
            .notNull()
            .unique()
            .references(() => eventParticipants.id, { onDelete: 'cascade' }),
        certificate_number: varchar('certificate_number', { length: 50 })
            .notNull()
            .unique(),
        file_url: text('file_url').notNull(),
        status: certificateStatusEnum('status').notNull().default('generated'),
        issued_at: timestamp('issued_at', {
            withTimezone: true,
            mode: 'date'
        }).notNull()
    },
    table => [
        index('certificates_status_idx').on(table.status),
        index('certificates_issued_at_idx').on(table.issued_at)
    ]
)

export type Certificate = typeof certificates.$inferSelect
export type NewCertificate = typeof certificates.$inferInsert
