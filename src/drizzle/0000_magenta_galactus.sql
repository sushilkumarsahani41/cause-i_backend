DO $$ BEGIN
 CREATE TYPE "questions_attribute_enum" AS ENUM('authenticity', 'mindfulness', 'righteousness', 'altruism', 'kindness');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "questions_type_enum" AS ENUM('saq', 'mcq', 'quant');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status_enum" AS ENUM('published', 'draft');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "advices" (
	"id" serial PRIMARY KEY NOT NULL,
	"cause_level_id" integer,
	"section" text NOT NULL,
	"content" text NOT NULL,
	"img_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cause_levels" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" text NOT NULL,
	"min_score" double precision NOT NULL,
	"max_score" double precision NOT NULL,
	"img_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characteristics" (
	"id" serial PRIMARY KEY NOT NULL,
	"cause_level_id" integer,
	"trait" text NOT NULL,
	"description" text NOT NULL,
	"img_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedbacks" (
	"user_id" integer NOT NULL,
	"rating" double precision NOT NULL,
	"comment" text,
	"survey_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "feedbacks_user_id_survey_id_pk" PRIMARY KEY("user_id","survey_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "options" (
	"id" serial PRIMARY KEY NOT NULL,
	"score" double precision NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"question_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "questions_type_enum" NOT NULL,
	"title" text NOT NULL,
	"situation" text,
	"image_url" text,
	"image_caption" text,
	"status" "status_enum" DEFAULT 'draft' NOT NULL,
	"karma_attribute" "questions_attribute_enum" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"survey_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "responses" (
	"question_id" integer NOT NULL,
	"survey_id" integer NOT NULL,
	"option_id" integer,
	"saq_response" text,
	"respondent_id" integer NOT NULL,
	"score_calculated" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "responses_question_id_respondent_id_pk" PRIMARY KEY("question_id","respondent_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scales" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"kindness" double precision DEFAULT 0 NOT NULL,
	"altruism" double precision DEFAULT 0 NOT NULL,
	"righteousness" double precision DEFAULT 0 NOT NULL,
	"mindfulness" double precision DEFAULT 0 NOT NULL,
	"authenticity" double precision DEFAULT 0 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"result_email_sent" boolean DEFAULT false NOT NULL,
	"current_question_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "surveys" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"status" "status_enum" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advices_on_id" ON "advices" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_cause_levels_on_id_min_score_max_score" ON "cause_levels" ("id","min_score","max_score");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_characteristics_on_id" ON "characteristics" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_feedbacks_on_user_id" ON "feedbacks" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_options_on_id_question_id" ON "options" ("id","question_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_questions_on_id_survey_id" ON "questions" ("id","survey_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_responses_on_respondent_id_survey_id_question_id_option_id" ON "responses" ("respondent_id","survey_id","question_id","option_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_scales_on_user_id" ON "scales" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_surveys_on_id_title" ON "surveys" ("id","title");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "advices" ADD CONSTRAINT "advices_cause_level_id_cause_levels_id_fk" FOREIGN KEY ("cause_level_id") REFERENCES "cause_levels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characteristics" ADD CONSTRAINT "characteristics_cause_level_id_cause_levels_id_fk" FOREIGN KEY ("cause_level_id") REFERENCES "cause_levels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "options" ADD CONSTRAINT "options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "responses" ADD CONSTRAINT "responses_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "responses" ADD CONSTRAINT "responses_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "responses" ADD CONSTRAINT "responses_option_id_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scales" ADD CONSTRAINT "scales_current_question_id_questions_id_fk" FOREIGN KEY ("current_question_id") REFERENCES "questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
----> function to handle auto update updated_at column
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
----> trigger to handle auto update updated_at column
CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON surveys
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();
--> statement-breakpoint
CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON questions
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();
--> statement-breakpoint
CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON options
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();
--> statement-breakpoint
CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON scales
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();
--> statement-breakpoint
CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON responses
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();
--> statement-breakpoint
