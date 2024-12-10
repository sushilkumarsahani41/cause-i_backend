
-- Disable foreign key checks
SET session_replication_role = 'replica';

-- Delete all rows
DELETE FROM public.surveys;

-- Delete all rows
DELETE FROM public.questions;

-- Delete all rows
DELETE FROM public."options";

ALTER SEQUENCE public.surveys_id_seq RESTART WITH 1;
ALTER SEQUENCE public.questions_id_seq RESTART WITH 1;
ALTER SEQUENCE public.options_id_seq RESTART WITH 1;

-- Enable foreign key checks
SET session_replication_role = 'origin';