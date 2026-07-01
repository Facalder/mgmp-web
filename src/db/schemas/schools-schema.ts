import { index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { timestamps } from '@/db/helpers/timestamps'

export const schools = pgTable(
    'schools',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        npsn: varchar('npsn', { length: 10 }).notNull().unique(),
        name: varchar('name', { length: 150 }).notNull(),
        district: varchar('district', { length: 100 }),
        address: text('address'),
        ...timestamps
    },
    table => [
        index('schools_is_deleted_idx').on(table.is_deleted),
        index('schools_district_idx').on(table.district)
    ]
)

export type School = typeof schools.$inferSelect
export type NewSchool = typeof schools.$inferInsert
