import { index, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { galleries } from '@/db/schemas/galleries-schema'

export const galleryItems = pgTable(
    'gallery_items',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        gallery_id: text('gallery_id')
            .notNull()
            .references(() => galleries.id, { onDelete: 'cascade' }),
        url: text('url').notNull(),
        caption: varchar('caption', { length: 300 }),
        sort_order: integer('sort_order').notNull().default(0)
    },
    table => [index('gallery_items_gallery_id_idx').on(table.gallery_id)]
)

export type GalleryItem = typeof galleryItems.$inferSelect
export type NewGalleryItem = typeof galleryItems.$inferInsert
