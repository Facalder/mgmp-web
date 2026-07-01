import { defineRelations } from 'drizzle-orm'
import { accounts } from '@/db/schemas/accounts-schema'
import { activityLogs } from '@/db/schemas/activity-logs-schema'
import { certificates } from '@/db/schemas/certificates-schema'
import { contents } from '@/db/schemas/contents-schema'
import { documents } from '@/db/schemas/documents-schema'
import { eventParticipants } from '@/db/schemas/event-participants-schema'
import { events } from '@/db/schemas/events-schema'
import { galleries } from '@/db/schemas/galleries-schema'
import { galleryItems } from '@/db/schemas/gallery-items-schema'
import { sessions } from '@/db/schemas/sessions-schema'
import { staticPages } from '@/db/schemas/static-pages-schema'
import { teacherProfiles } from '@/db/schemas/teacher-profiles-schema'
import { users } from '@/db/schemas/users-schema'

const schema = {
    users,
    accounts,
    sessions,
    teacherProfiles,
    activityLogs,
    staticPages,
    contents,
    documents,
    events,
    eventParticipants,
    certificates,
    galleries,
    galleryItems
}

export const relations = defineRelations(schema, r => ({
    users: {
        accounts: r.many.accounts(),
        sessions: r.many.sessions(),
        teacherProfile: r.one.teacherProfiles({
            from: [r.users.id],
            to: [r.teacherProfiles.user_id]
        }),
        activityLogs: r.many.activityLogs(),
        editedStaticPages: r.many.staticPages(),
        authoredContents: r.many.contents({ alias: 'author' }),
        reviewedContents: r.many.contents({ alias: 'reviewer' }),
        uploadedDocuments: r.many.documents({ alias: 'uploader' }),
        verifiedDocuments: r.many.documents({ alias: 'verifier' }),
        createdEvents: r.many.events(),
        eventParticipations: r.many.eventParticipants(),
        createdGalleries: r.many.galleries()
    },
    teacherProfiles: {
        user: r.one.users({
            from: [r.teacherProfiles.user_id],
            to: [r.users.id]
        })
    },
    accounts: {
        user: r.one.users({
            from: [r.accounts.user_id],
            to: [r.users.id]
        })
    },
    sessions: {
        user: r.one.users({
            from: [r.sessions.user_id],
            to: [r.users.id]
        })
    },
    activityLogs: {
        user: r.one.users({
            from: [r.activityLogs.user_id],
            to: [r.users.id]
        })
    },
    staticPages: {
        updatedBy: r.one.users({
            from: [r.staticPages.updated_by],
            to: [r.users.id]
        })
    },
    contents: {
        author: r.one.users({
            from: [r.contents.author_id],
            to: [r.users.id],
            alias: 'author'
        }),
        reviewer: r.one.users({
            from: [r.contents.reviewed_by],
            to: [r.users.id],
            alias: 'reviewer'
        })
    },
    documents: {
        uploader: r.one.users({
            from: [r.documents.uploader_id],
            to: [r.users.id],
            alias: 'uploader'
        }),
        verifier: r.one.users({
            from: [r.documents.verified_by],
            to: [r.users.id],
            alias: 'verifier'
        })
    },
    events: {
        creator: r.one.users({
            from: [r.events.created_by],
            to: [r.users.id]
        }),
        participants: r.many.eventParticipants()
    },
    eventParticipants: {
        event: r.one.events({
            from: [r.eventParticipants.event_id],
            to: [r.events.id]
        }),
        user: r.one.users({
            from: [r.eventParticipants.user_id],
            to: [r.users.id]
        }),
        certificate: r.one.certificates({
            from: [r.eventParticipants.id],
            to: [r.certificates.event_participant_id]
        })
    },
    certificates: {
        participant: r.one.eventParticipants({
            from: [r.certificates.event_participant_id],
            to: [r.eventParticipants.id]
        })
    },
    galleries: {
        creator: r.one.users({
            from: [r.galleries.created_by],
            to: [r.users.id]
        }),
        items: r.many.galleryItems()
    },
    galleryItems: {
        gallery: r.one.galleries({
            from: [r.galleryItems.gallery_id],
            to: [r.galleries.id]
        })
    }
}))
