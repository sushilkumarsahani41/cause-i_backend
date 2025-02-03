import {
  pgTable,
  pgEnum,
  varchar,
  serial,
  integer,
  timestamp,
  index,
  uuid,
  boolean,
  bigint,
  date
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const platformTypesEnum = pgEnum('platform_types_enum', [
  'dobe',
  'cause-i'
])
export const userVerificationActionsEnum = pgEnum(
  'user_verification_actions_enum',
  ['login', 'register']
)
export const usersRolesEnum = pgEnum('users_roles_enum', [
  'moderator',
  'admin',
  'user'
])
export const usersStatusesEnum = pgEnum('users_statuses_enum', [
  'inactive',
  'verified',
  'not-verified'
])

export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey().notNull(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  expireAt: timestamp('expire_at', {
    withTimezone: true,
    mode: 'string'
  }).notNull(),
  platformType: platformTypesEnum('platform_type').notNull()
})

export const userVerifications = pgTable(
  'user_verifications',
  {
    id: uuid('id')
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    otpCode: varchar('otp_code').notNull(),
    verificationSource: varchar('verification_source').notNull(),
    actionPlatform: platformTypesEnum('action_platform').notNull(),
    action: userVerificationActionsEnum('action').notNull(),
    verified: boolean('verified').default(false).notNull(),
    expireAt: timestamp('expire_at', {
      withTimezone: true,
      mode: 'string'
    }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
  },
  (table) => {
    return {
      idxUserVerificationsOnIdUserIdOtpCode: index(
        'idx_user_verifications_on_id_user_id_otp_code'
      ).on(table.id, table.userId, table.otpCode)
    }
  }
)

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey().notNull(),
    email: varchar('email').unique().notNull(),
    name: varchar('name'),
    contactNumber: bigint('contact_number', { mode: 'number' }),
    contactNumberCountryCode: varchar('contact_number_country_code'),
    city: varchar('city'),
    state: varchar('state'),
    country: varchar('country'),
    pincode: integer('pincode'),
    gender: varchar('gender'),
    dob: date('dob'),
    status: usersStatusesEnum('status').default('not-verified').notNull(),
    registrationPlatform: platformTypesEnum('registration_platform').notNull(),
    purposeCode: varchar('purpose_code'),
    nationality: varchar('nationality'),
    ethnicity: varchar('ethnicity'),
    qualification: varchar('qualification'),
    profession: varchar('profession'),
    role: usersRolesEnum('role').default('user').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' })
  },
  (table) => {
    return {
      idxUsersOnIdEmail: index('idx_users_on_id_email').on(
        table.id,
        table.email
      )
    }
  }
)
