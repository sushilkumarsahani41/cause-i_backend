import type { Config } from 'drizzle-kit'

export default {
  driver: 'pg',
  out: './src/drizzle',
  schema: './src/drizzle/schema.ts',
  dbCredentials: { connectionString: process.env.DATABASE_URL },
  verbose: true,
  strict: true
} satisfies Config
