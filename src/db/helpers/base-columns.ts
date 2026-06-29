import { text } from 'drizzle-orm/pg-core'

export const createBaseColumns = (_table: string) => ({
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID())
})
