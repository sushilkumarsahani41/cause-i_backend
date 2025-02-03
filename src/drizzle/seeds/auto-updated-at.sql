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
