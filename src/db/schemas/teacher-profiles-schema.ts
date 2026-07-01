import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { users } from '@/db/schemas/users-schema'

export const teacherProfiles = pgTable('teacher_profiles', {
    user_id: text('user_id')
        .primaryKey()
        .references(() => users.id, { onDelete: 'cascade' }),
    school_name: varchar('school_name', { length: 100 }),
    school_npsn: varchar('school_npsn', { length: 10 }),
    subject: varchar('subject', { length: 100 }),
    bio: text('bio'),
    registration_doc_url: text('registration_doc_url')
})

export type TeacherProfile = typeof teacherProfiles.$inferSelect
export type NewTeacherProfile = typeof teacherProfiles.$inferInsert
