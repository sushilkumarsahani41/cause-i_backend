import { relations } from 'drizzle-orm'
import {
  pgTable,
  pgEnum,
  serial,
  text,
  timestamp,
  integer,
  doublePrecision,
  varchar,
  boolean,
  primaryKey,
  index,
  json,
  numeric
} from "drizzle-orm/pg-core";
import { users } from '@/drizzle/auth-schema'

export const questionsTypeEnum = pgEnum('questions_type_enum', [
  'saq',
  'mcq',
  'quant'
])

export const statusEnum = pgEnum('status_enum', ['published', 'draft'])
export const questionsAttributeEnum = pgEnum('questions_attribute_enum', [
  'authenticity',
  'mindfulness',
  'righteousness',
  'altruism',
  'kindness'
])

export const surveys = pgTable(
  'surveys',
  {
    id: serial('id').primaryKey().notNull(),
    title: varchar('title').notNull(),
    description: varchar('description').notNull(),
    status: statusEnum('status').default('draft').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
  },
  (table) => {
    return {
      idx: index('idx_surveys_on_id_title').on(table.id, table.title)
    }
  }
)

export const questions = pgTable(
  'questions',
  {
    id: serial('id').primaryKey().notNull(),
    type: questionsTypeEnum('type').notNull(),
    title: text('title').notNull(),
    situation: text('situation'),
    imageUrl: text('image_url'),
    imageCaption: text('image_caption'),
    status: statusEnum('status').default('draft').notNull(),
    karmaAttribute: questionsAttributeEnum('karma_attribute').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    surveyId: integer('survey_id')
      .notNull()
      .references(() => surveys.id),
    multiLanguage: json('multi_language')
  },
  (table) => {
    return {
      idx: index('idx_questions_on_id_survey_id').on(table.id, table.surveyId)
    }
  }
)

export const options = pgTable(
  'options',
  {
    id: serial('id').primaryKey().notNull(),
    score: doublePrecision('score').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    questionId: integer('question_id')
      .notNull()
      .references(() => questions.id),
    multiLanguage: json('multi_language')
  },
  (table) => {
    return {
      idx: index('idx_options_on_id_question_id').on(table.id, table.questionId)
    }
  }
)

export const scales = pgTable(
  'scales',
  {
    userId: integer('user_id').primaryKey().notNull(),
    kindness: doublePrecision('kindness').default(0).notNull(),
    altruism: doublePrecision('altruism').default(0).notNull(),
    righteousness: doublePrecision('righteousness').default(0).notNull(),
    mindfulness: doublePrecision('mindfulness').default(0).notNull(),
    authenticity: doublePrecision('authenticity').default(0).notNull(),
    completed: boolean('completed').default(false).notNull(),
    resultEmailSent: boolean('result_email_sent').default(false).notNull(),
    currentQuestionId: integer('current_question_id')
      .notNull()
      .references(() => questions.id),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
  },
  (table) => {
    return {
      idx: index('idx_scales_on_user_id').on(table.userId)
    }
  }
)

export const feedbacks = pgTable(
  'feedbacks',
  {
    userId: integer('user_id').notNull(),
    rating: doublePrecision('rating').notNull(),
    comment: text('comment'),
    surveyId: integer('survey_id')
      .notNull()
      .references(() => surveys.id),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.surveyId] }),
      idx: index('idx_feedbacks_on_user_id').on(table.userId)
    }
  }
)

export const responses = pgTable(
  'responses',
  {
    questionId: integer('question_id')
      .notNull()
      .references(() => questions.id),
    surveyId: integer('survey_id')
      .notNull()
      .references(() => surveys.id),
    optionId: integer('option_id').references(() => options.id),
    saqResponse: text('saq_response'),
    respondentId: integer('respondent_id').notNull(),
    scoreCalculated: boolean('score_calculated').default(false).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.questionId, table.respondentId]
      }),
      idx: index(
        'idx_responses_on_respondent_id_survey_id_question_id_option_id'
      ).on(table.respondentId, table.surveyId, table.questionId, table.optionId)
    }
  }
)

// **** Sushil Code Start ****

export const payments = pgTable('payments', {
  mihpayid: text('mihpayid'),
  txnid: text('txnid').primaryKey(),
  amount: numeric('amount'),
  productinfo: text('productinfo'),
  firstname: text('firstname'),
  email: text('email'),
  status: text('status'),
  bank_ref_num: text('bank_ref_num'),
  phone: text('phone'),
  mode: text('mode'),
  hash: text('hash')
});

//FasFac Causes
export const fasfacCause = pgTable(
  'fasfac_cause',
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    colour: varchar('colour'),
    hindiName: varchar('name_hindi'),
    descriptionHindi: varchar('description_hindi'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
  },
  (table) => {
    return {
      idx: index('idx_fasfac_cause_on_id').on(table.id)
    }
  }
)

//FasFac Payment Table
export const fasfacPayments = pgTable(
  'fasfac_payments',
  {
    id: serial('id').primaryKey().notNull(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    paymentGatewayId: varchar('payment_gateway_id'),
    paymentAmount: doublePrecision('payment_amount'),
    paymentStatus: varchar('payment_status'),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string'
    }).defaultNow(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string'
    }).defaultNow()
  },
  (table) => {
    return {
      idx: index('idx_fasfac_payments_on_id').on(table.id)
    }
  }
)

//FasFac User Info-Tabel
export const fasfacUserPrefs = pgTable(
  'fasfac_user_prefs',
  {
    id: serial('id').primaryKey().notNull(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    causeId: integer('cause_id')
      .references(() => fasfacCause.id)
      .notNull(),
    amountPledged: doublePrecision('amount_pledged'),
    fullName: varchar('full_name'),
    phoneNumber: varchar('phone_number'),
    age: integer('age'),
    gender: varchar('gender'),
    nationality: varchar('nationality'),
    profession: varchar('profession'),
    paymentId: varchar('payment_id'),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string'
    }).defaultNow(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string'
    }).defaultNow()
  },
  (table) => {
    return {
      idx: index('idx_fasfac_user_prefs_on_id').on(table.id)
    }
  }
)

// *** Sushil Code end ***

export const causeLevels = pgTable(
  'cause_levels',
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name').notNull(),
    description: text('description').notNull(),
    minScore: doublePrecision('min_score').notNull(),
    maxScore: doublePrecision('max_score').notNull(),
    imgUrl: text('img_url').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
  },
  (table) => {
    return {
      idx: index('idx_cause_levels_on_id_min_score_max_score').on(
        table.id,
        table.minScore,
        table.maxScore
      )
    }
  }
)

export const characteristics = pgTable(
  'characteristics',
  {
    id: serial('id').primaryKey().notNull(),
    causeLevelId: integer('cause_level_id').references(() => causeLevels.id),
    trait: text('trait').notNull(),
    description: text('description').notNull(),
    imgUrl: text('img_url').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
  },
  (table) => {
    return {
      idx: index('idx_characteristics_on_id').on(table.id)
    }
  }
)

export const advices = pgTable(
  'advices',
  {
    id: serial('id').primaryKey().notNull(),
    causeLevelId: integer('cause_level_id').references(() => causeLevels.id),
    section: text('section').notNull(),
    content: text('content').notNull(),
    imgUrl: text('img_url'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
  },
  (table) => {
    return {
      idx: index('idx_advices_on_id').on(table.id)
    }
  }
)

export const surveyRelations = relations(surveys, ({ many }) => ({
  questions: many(questions),
  feedbacks: many(feedbacks)
}))

export const questionRelations = relations(questions, ({ one, many }) => ({
  survey: one(surveys, {
    fields: [questions.surveyId],
    references: [surveys.id]
  }),
  options: many(options)
}))

export const optionRelations = relations(options, ({ one }) => ({
  question: one(questions, {
    fields: [options.questionId],
    references: [questions.id]
  })
}))

export const responseRelations = relations(responses, ({ one }) => ({
  survey: one(surveys, {
    fields: [responses.surveyId],
    references: [surveys.id]
  }),
  question: one(questions, {
    fields: [responses.questionId],
    references: [questions.id]
  }),
  option: one(options, {
    fields: [responses.optionId],
    references: [options.id]
  })
}))

export const feedbackRelations = relations(feedbacks, ({ one }) => ({
  survey: one(surveys, {
    fields: [feedbacks.surveyId],
    references: [surveys.id]
  })
}))

export const causeLevelRelations = relations(causeLevels, ({ many }) => ({
  characteristics: many(characteristics),
  advices: many(advices)
}))

export const characteristicRelations = relations(
  characteristics,
  ({ one }) => ({
    causeLevel: one(causeLevels, {
      fields: [characteristics.causeLevelId],
      references: [causeLevels.id]
    })
  })
)

export const adviceRelations = relations(advices, ({ one }) => ({
  causeLevel: one(causeLevels, {
    fields: [advices.causeLevelId],
    references: [causeLevels.id]
  })
}))
