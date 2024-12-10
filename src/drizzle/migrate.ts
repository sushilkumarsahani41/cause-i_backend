import 'dotenv/config'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 })

async function main() {
  const db = drizzle(migrationClient)
  await migrate(db, { migrationsFolder: 'src/drizzle/' })
  await migrationClient.end()
}

main()
