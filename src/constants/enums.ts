import { pgEnum } from 'drizzle-orm/pg-core'

export const ACCOUNT_STATUS_VALUES = [
    'active',
    'inactive',
    'disabled',
    'pending_verification'
] as const

export type AccountStatus = (typeof ACCOUNT_STATUS_VALUES)[number]

export const accountStatusEnum = pgEnum('account_status', ACCOUNT_STATUS_VALUES)

export const ACCOUNT_ROLE_VALUES = [
    'super_admin',
    'admin',
    'teacher',
    'supervisor',
    'guest'
] as const

export type AccountRole = (typeof ACCOUNT_ROLE_VALUES)[number]

export const accountRoleEnum = pgEnum('account_role', ACCOUNT_ROLE_VALUES)

export const CONTENT_TYPE_VALUES = [
    'news',
    'announcement',
    'article',
    'opinion',
    'literary'
] as const
export type ContentType = (typeof CONTENT_TYPE_VALUES)[number]
export const contentTypeEnum = pgEnum('content_type', CONTENT_TYPE_VALUES)

export const CONTENT_STATUS_VALUES = [
    'draft',
    'pending_review',
    'published',
    'rejected',
    'scheduled'
] as const
export type ContentStatus = (typeof CONTENT_STATUS_VALUES)[number]
export const contentStatusEnum = pgEnum('content_status', CONTENT_STATUS_VALUES)

export const DOCUMENT_CATEGORY_VALUES = [
    'rpp',
    'modul_ajar',
    'lkpd',
    'soal',
    'silabus',
    'bahan_ajar'
] as const
export type DocumentCategory = (typeof DOCUMENT_CATEGORY_VALUES)[number]
export const documentCategoryEnum = pgEnum(
    'document_category',
    DOCUMENT_CATEGORY_VALUES
)

export const DOCUMENT_STATUS_VALUES = [
    'pending',
    'verified',
    'rejected'
] as const
export type DocumentStatus = (typeof DOCUMENT_STATUS_VALUES)[number]
export const documentStatusEnum = pgEnum(
    'document_status',
    DOCUMENT_STATUS_VALUES
)

export const CURRICULUM_VALUES = ['2013', 'merdeka', 'ktsp'] as const
export type Curriculum = (typeof CURRICULUM_VALUES)[number]
export const curriculumEnum = pgEnum('curriculum', CURRICULUM_VALUES)

export const EVENT_TYPE_VALUES = [
    'workshop',
    'seminar',
    'webinar',
    'rapat',
    'pelatihan',
    'lainnya'
] as const
export type EventType = (typeof EVENT_TYPE_VALUES)[number]
export const eventTypeEnum = pgEnum('event_type', EVENT_TYPE_VALUES)

export const ATTENDANCE_STATUS_VALUES = [
    'registered',
    'present',
    'absent'
] as const
export type AttendanceStatus = (typeof ATTENDANCE_STATUS_VALUES)[number]
export const attendanceStatusEnum = pgEnum(
    'attendance_status',
    ATTENDANCE_STATUS_VALUES
)

export const CERTIFICATE_STATUS_VALUES = ['generated', 'revoked'] as const
export type CertificateStatus = (typeof CERTIFICATE_STATUS_VALUES)[number]
export const certificateStatusEnum = pgEnum(
    'certificate_status',
    CERTIFICATE_STATUS_VALUES
)

export const GALLERY_TYPE_VALUES = ['photo', 'video'] as const
export type GalleryType = (typeof GALLERY_TYPE_VALUES)[number]
export const galleryTypeEnum = pgEnum('gallery_type', GALLERY_TYPE_VALUES)

export const ACTIVITY_ACTION_VALUES = [
    'login',
    'logout',
    'update_profile',
    'upload_document',
    'delete_document',
    'update_password',
    'change_role'
] as const
export type ActivityAction = (typeof ACTIVITY_ACTION_VALUES)[number]
export const activityActionEnum = pgEnum(
    'activity_action',
    ACTIVITY_ACTION_VALUES
)
