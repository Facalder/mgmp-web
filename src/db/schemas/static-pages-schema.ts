import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { timestamps } from '@/db/helpers/timestamps'
import { users } from '@/db/schemas/users-schema'

export const staticPages = pgTable('static_pages', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    title: varchar('title', { length: 200 }).notNull(),
    content: text('content').notNull(),
    updated_by: text('updated_by').references(() => users.id, {
        onDelete: 'set null'
    }),
    ...timestamps
})

export type StaticPage = typeof staticPages.$inferSelect
export type NewStaticPage = typeof staticPages.$inferInsert
