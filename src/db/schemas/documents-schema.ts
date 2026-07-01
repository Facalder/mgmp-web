import {
    index,
    integer,
    pgTable,
    text,
    timestamp,
    varchar
} from 'drizzle-orm/pg-core'
import {
    curriculumEnum,
    documentCategoryEnum,
    documentStatusEnum
} from '@/constants/enums'
import { timestamps } from '@/db/helpers/timestamps'
import { users } from '@/db/schemas/users-schema'

export const documents = pgTable(
    'documents',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        uploader_id: text('uploader_id')
            .notNull()
            .references(() => users.id, { onDelete: 'restrict' }),
        title: varchar('title', { length: 200 }).notNull(),
        category: documentCategoryEnum('category').notNull(),
        curriculum: curriculumEnum('curriculum').notNull(),
        class_level: varchar('class_level', { length: 20 }).notNull(),
        file_url: text('file_url').notNull(),
        file_name: varchar('file_name', { length: 255 }).notNull(),
        file_size: integer('file_size').notNull(),
        file_mime: varchar('file_mime', { length: 100 }).notNull(),
        status: documentStatusEnum('status').notNull().default('pending'),
        verified_by: text('verified_by').references(() => users.id, {
            onDelete: 'set null'
        }),
        verified_at: timestamp('verified_at', {
            withTimezone: true,
            mode: 'date'
        }),
        download_count: integer('download_count').notNull().default(0),
        description: text('description'),
        ...timestamps
    },
    table => [
        index('documents_is_deleted_idx').on(table.is_deleted),
        index('documents_uploader_id_idx').on(table.uploader_id),
        index('documents_category_curriculum_idx').on(
            table.category,
            table.curriculum
        ),
        index('documents_status_idx').on(table.status),
        index('documents_class_level_idx').on(table.class_level)
    ]
)

export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert
