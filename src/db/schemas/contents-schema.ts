import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { contentStatusEnum, contentTypeEnum } from '@/constants/enums'
import { timestamps } from '@/db/helpers/timestamps'
import { users } from '@/db/schemas/users-schema'

export const contents = pgTable(
    'contents',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        type: contentTypeEnum('type').notNull(),
        status: contentStatusEnum('status').notNull().default('draft'),
        title: varchar('title', { length: 300 }).notNull(),
        slug: varchar('slug', { length: 350 }).notNull().unique(),
        body: text('body').notNull(),
        thumbnail_url: text('thumbnail_url'),
        category: varchar('category', { length: 100 }),
        author_id: text('author_id')
            .notNull()
            .references(() => users.id, { onDelete: 'restrict' }),
        reviewed_by: text('reviewed_by').references(() => users.id, {
            onDelete: 'set null'
        }),
        review_note: text('review_note'),
        scheduled_at: timestamp('scheduled_at', {
            withTimezone: true,
            mode: 'date'
        }),
        published_at: timestamp('published_at', {
            withTimezone: true,
            mode: 'date'
        }),
        ...timestamps
    },
    table => [
        index('contents_is_deleted_idx').on(table.is_deleted),
        index('contents_type_status_idx').on(table.type, table.status),
        index('contents_category_idx').on(table.category),
        index('contents_author_id_idx').on(table.author_id),
        index('contents_published_at_idx').on(table.published_at)
    ]
)

export type Content = typeof contents.$inferSelect
export type NewContent = typeof contents.$inferInsert
