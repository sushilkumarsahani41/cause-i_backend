import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import * as authSchema from './auth-schema'

const queryClient = postgres(process.env.DATABASE_URL)
export const db = drizzle(queryClient, { schema, logger: true })

const authQueryClient = postgres(process.env.AUTH_DATABASE_URL)
export const authDb = drizzle(authQueryClient, {
  schema: authSchema,
  logger: true
})
