CREATE TABLE "accounts" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"action" "activity_action" NOT NULL,
	"metadata" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "certificates" (
	"id" text PRIMARY KEY,
	"event_participant_id" text NOT NULL UNIQUE,
	"certificate_number" varchar(50) NOT NULL UNIQUE,
	"file_url" text NOT NULL,
	"status" "certificate_status" DEFAULT 'generated'::"certificate_status" NOT NULL,
	"issued_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contents" (
	"id" text PRIMARY KEY,
	"type" "content_type" NOT NULL,
	"status" "content_status" DEFAULT 'draft'::"content_status" NOT NULL,
	"title" varchar(300) NOT NULL,
	"slug" varchar(350) NOT NULL UNIQUE,
	"body" text NOT NULL,
	"thumbnail_url" text,
	"category" varchar(100),
	"author_id" text NOT NULL,
	"reviewed_by" text,
	"review_note" text,
	"scheduled_at" timestamp with time zone,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" text PRIMARY KEY,
	"uploader_id" text NOT NULL,
	"title" varchar(200) NOT NULL,
	"category" "document_category" NOT NULL,
	"curriculum" "curriculum" NOT NULL,
	"class_level" varchar(20) NOT NULL,
	"file_url" text NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_size" integer NOT NULL,
	"file_mime" varchar(100) NOT NULL,
	"status" "document_status" DEFAULT 'pending'::"document_status" NOT NULL,
	"verified_by" text,
	"verified_at" timestamp with time zone,
	"download_count" integer DEFAULT 0 NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_participants" (
	"id" text PRIMARY KEY,
	"event_id" text NOT NULL,
	"user_id" text NOT NULL,
	"status" "attendance_status" DEFAULT 'registered'::"attendance_status" NOT NULL,
	"checked_in_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" text PRIMARY KEY,
	"created_by" text NOT NULL,
	"title" varchar(200) NOT NULL,
	"type" "event_type" NOT NULL,
	"description" text,
	"location" varchar(200),
	"started_at" timestamp with time zone NOT NULL,
	"ended_at" timestamp with time zone,
	"quota" integer,
	"is_registration_open" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "galleries" (
	"id" text PRIMARY KEY,
	"type" "gallery_type" NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"event_date" timestamp with time zone NOT NULL,
	"category" varchar(100),
	"created_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_items" (
	"id" text PRIMARY KEY,
	"gallery_id" text NOT NULL,
	"url" text NOT NULL,
	"caption" varchar(300),
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schools" (
	"id" text PRIMARY KEY,
	"npsn" varchar(10) NOT NULL UNIQUE,
	"name" varchar(150) NOT NULL,
	"district" varchar(100),
	"address" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY,
	"token" text NOT NULL UNIQUE,
	"expires_at" timestamp NOT NULL,
	"user_agent" text,
	"ip_address" text,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "static_pages" (
	"id" text PRIMARY KEY,
	"slug" varchar(100) NOT NULL UNIQUE,
	"title" varchar(200) NOT NULL,
	"content" text NOT NULL,
	"updated_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teacher_profiles" (
	"user_id" text PRIMARY KEY,
	"school_name" varchar(100),
	"school_npsn" varchar(10),
	"subject" varchar(100),
	"bio" text,
	"registration_doc_url" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"nip" varchar(20) UNIQUE,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"phone_number" varchar(20) UNIQUE,
	"avatar_url" text,
	"role" "account_role" DEFAULT 'teacher'::"account_role" NOT NULL,
	"status" "account_status" DEFAULT 'active'::"account_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE INDEX "accounts_user_id_idx" ON "accounts" ("user_id");--> statement-breakpoint
CREATE INDEX "accounts_is_deleted_idx" ON "accounts" ("is_deleted");--> statement-breakpoint
CREATE INDEX "activity_logs_user_id_idx" ON "activity_logs" ("user_id");--> statement-breakpoint
CREATE INDEX "activity_logs_action_idx" ON "activity_logs" ("action");--> statement-breakpoint
CREATE INDEX "activity_logs_created_at_idx" ON "activity_logs" ("created_at");--> statement-breakpoint
CREATE INDEX "certificates_status_idx" ON "certificates" ("status");--> statement-breakpoint
CREATE INDEX "certificates_issued_at_idx" ON "certificates" ("issued_at");--> statement-breakpoint
CREATE INDEX "contents_is_deleted_idx" ON "contents" ("is_deleted");--> statement-breakpoint
CREATE INDEX "contents_type_status_idx" ON "contents" ("type","status");--> statement-breakpoint
CREATE INDEX "contents_category_idx" ON "contents" ("category");--> statement-breakpoint
CREATE INDEX "contents_author_id_idx" ON "contents" ("author_id");--> statement-breakpoint
CREATE INDEX "contents_published_at_idx" ON "contents" ("published_at");--> statement-breakpoint
CREATE INDEX "documents_is_deleted_idx" ON "documents" ("is_deleted");--> statement-breakpoint
CREATE INDEX "documents_uploader_id_idx" ON "documents" ("uploader_id");--> statement-breakpoint
CREATE INDEX "documents_category_curriculum_idx" ON "documents" ("category","curriculum");--> statement-breakpoint
CREATE INDEX "documents_status_idx" ON "documents" ("status");--> statement-breakpoint
CREATE INDEX "documents_class_level_idx" ON "documents" ("class_level");--> statement-breakpoint
CREATE UNIQUE INDEX "event_participants_event_user_uidx" ON "event_participants" ("event_id","user_id");--> statement-breakpoint
CREATE INDEX "event_participants_event_id_idx" ON "event_participants" ("event_id");--> statement-breakpoint
CREATE INDEX "event_participants_user_id_idx" ON "event_participants" ("user_id");--> statement-breakpoint
CREATE INDEX "event_participants_status_idx" ON "event_participants" ("status");--> statement-breakpoint
CREATE INDEX "events_is_deleted_idx" ON "events" ("is_deleted");--> statement-breakpoint
CREATE INDEX "events_started_at_idx" ON "events" ("started_at");--> statement-breakpoint
CREATE INDEX "events_type_idx" ON "events" ("type");--> statement-breakpoint
CREATE INDEX "galleries_is_deleted_idx" ON "galleries" ("is_deleted");--> statement-breakpoint
CREATE INDEX "galleries_type_idx" ON "galleries" ("type");--> statement-breakpoint
CREATE INDEX "galleries_category_idx" ON "galleries" ("category");--> statement-breakpoint
CREATE INDEX "gallery_items_gallery_id_idx" ON "gallery_items" ("gallery_id");--> statement-breakpoint
CREATE INDEX "schools_is_deleted_idx" ON "schools" ("is_deleted");--> statement-breakpoint
CREATE INDEX "schools_district_idx" ON "schools" ("district");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_is_deleted_idx" ON "sessions" ("is_deleted");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "sessions" ("expires_at");--> statement-breakpoint
CREATE INDEX "users_is_deleted_idx" ON "users" ("is_deleted");--> statement-breakpoint
CREATE INDEX "users_email_status_idx" ON "users" ("email","status");--> statement-breakpoint
CREATE INDEX "users_role_status_idx" ON "users" ("role","status");--> statement-breakpoint
CREATE INDEX "users_phone_status_idx" ON "users" ("phone_number","status");--> statement-breakpoint
CREATE INDEX "verifications_is_deleted_idx" ON "verifications" ("is_deleted");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_event_participant_id_event_participants_id_fkey" FOREIGN KEY ("event_participant_id") REFERENCES "event_participants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "contents" ADD CONSTRAINT "contents_author_id_users_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "contents" ADD CONSTRAINT "contents_reviewed_by_users_id_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploader_id_users_id_fkey" FOREIGN KEY ("uploader_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_verified_by_users_id_fkey" FOREIGN KEY ("verified_by") REFERENCES "users"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_event_id_events_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_users_id_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_created_by_users_id_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_gallery_id_galleries_id_fkey" FOREIGN KEY ("gallery_id") REFERENCES "galleries"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "static_pages" ADD CONSTRAINT "static_pages_updated_by_users_id_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "teacher_profiles" ADD CONSTRAINT "teacher_profiles_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;