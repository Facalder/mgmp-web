import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { galleryTypeEnum } from '@/constants/enums'
import { timestamps } from '@/db/helpers/timestamps'
import { users } from '@/db/schemas/users-schema'

export const galleries = pgTable(
    'galleries',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        type: galleryTypeEnum('type').notNull(),
        title: varchar('title', { length: 200 }).notNull(),
        description: text('description'),
        event_date: timestamp('event_date', {
            withTimezone: true,
            mode: 'date'
        }).notNull(),
        category: varchar('category', { length: 100 }),
        created_by: text('created_by')
            .notNull()
            .references(() => users.id, { onDelete: 'restrict' }),
        ...timestamps
    },
    table => [
        index('galleries_is_deleted_idx').on(table.is_deleted),
        index('galleries_type_idx').on(table.type),
        index('galleries_category_idx').on(table.category)
    ]
)

export type Gallery = typeof galleries.$inferSelect
export type NewGallery = typeof galleries.$inferInsert
