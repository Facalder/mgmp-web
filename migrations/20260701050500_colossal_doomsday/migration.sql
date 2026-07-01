CREATE TYPE "account_role" AS ENUM('super_admin', 'admin', 'teacher', 'supervisor', 'guest');--> statement-breakpoint
CREATE TYPE "account_status" AS ENUM('active', 'inactive', 'disabled', 'pending_verification');--> statement-breakpoint
CREATE TYPE "activity_action" AS ENUM('login', 'logout', 'update_profile', 'upload_document', 'delete_document', 'update_password', 'change_role');--> statement-breakpoint
CREATE TYPE "attendance_status" AS ENUM('registered', 'present', 'absent');--> statement-breakpoint
CREATE TYPE "certificate_status" AS ENUM('generated', 'revoked');--> statement-breakpoint
CREATE TYPE "content_status" AS ENUM('draft', 'pending_review', 'published', 'rejected', 'scheduled');--> statement-breakpoint
CREATE TYPE "content_type" AS ENUM('news', 'announcement', 'article', 'opinion', 'literary');--> statement-breakpoint
CREATE TYPE "curriculum" AS ENUM('2013', 'merdeka', 'ktsp');--> statement-breakpoint
CREATE TYPE "document_category" AS ENUM('rpp', 'modul_ajar', 'lkpd', 'soal', 'silabus', 'bahan_ajar');--> statement-breakpoint
CREATE TYPE "document_status" AS ENUM('pending', 'verified', 'rejected');--> statement-breakpoint
CREATE TYPE "event_type" AS ENUM('workshop', 'seminar', 'webinar', 'rapat', 'pelatihan', 'lainnya');--> statement-breakpoint
CREATE TYPE "gallery_type" AS ENUM('photo', 'video');