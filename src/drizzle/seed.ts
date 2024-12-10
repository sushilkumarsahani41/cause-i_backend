import 'dotenv/config'
import mcqs from './seeds/mcq.json'
import quants from './seeds/quant.json'
import saqs from './seeds/saq.json'
import {
  advices,
  characteristics,
  options,
  questions,
  surveys,
  causeLevels as causeLevelsTable
} from './schema'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import causeLevels from './seeds/cause.json'
const seedClient = postgres(process.env.DATABASE_URL, { max: 1 })

const surveyData = {
  title: 'The KARMA Scale',
  description: 'A survey to measure your karma levels',
  status: 'published'
}

const main = async () => {
  const db = drizzle(seedClient, { logger: true })
  //@ts-ignore
  const createdSurvey = await db.insert(surveys).values(surveyData).returning()

  // Seed Questions

  for (let index = 0; index < quants.length; index++) {
    const currentQuestion = quants[index]
    /* @ts-ignore */
    const createdQuestion = await db
      .insert(questions)
      .values({
        ...currentQuestion,
        status: 'published',
        surveyId: createdSurvey[0].id
      })
      .returning()

    const optionsData = currentQuestion.options.map((option) => ({
      ...option,
      questionId: createdQuestion[0].id
    }))

    await db.insert(options).values(optionsData).returning()
  }

  for (let index = 0; index < mcqs.length; index++) {
    const currentQuestion = mcqs[index]
    //@ts-ignore
    const createdQuestion = await db
      .insert(questions)
      .values({
        ...currentQuestion,
        status: 'published',
        surveyId: createdSurvey[0].id
      })
      .returning()

    const optionsData = currentQuestion.options.map((option) => ({
      ...option,
      questionId: createdQuestion[0].id
    }))

    await db.insert(options).values(optionsData).returning()
  }

  for (let index = 0; index < saqs.length; index++) {
    const currentQuestion = saqs[index]
    /* @ts-ignore */
    const createdQuestion = await db
      .insert(questions)
      .values({
        ...currentQuestion,
        status: 'published',
        surveyId: createdSurvey[0].id
      })
      .returning()
  }

  // Seed cause levels

  const currentCauseLevel = causeLevels[0]
  console.log(currentCauseLevel)

  for (let index = 0; index < causeLevels.length; index++) {
    const currentCauseLevel = causeLevels[index]
    const createdCauseLevel = await db
      .insert(causeLevelsTable)
      .values({
        name: currentCauseLevel.name,
        description: currentCauseLevel.description,
        minScore: currentCauseLevel.minScore,
        maxScore: currentCauseLevel.maxScore,
        imgUrl: currentCauseLevel.imgUrl
      })
      .returning()

    // Insert characteristics
    const characteristicsData = currentCauseLevel.characteristics.map(
      (characteristic) => ({
        ...characteristic,
        causeLevelId: createdCauseLevel[0].id
      })
    )

    await db.insert(characteristics).values(characteristicsData).returning()

    // Insert advice
    const adviceData = currentCauseLevel.advice.map((advice) => ({
      ...advice,
      causeLevelId: createdCauseLevel[0].id
    }))

    await db.insert(advices).values(adviceData).returning()
  }

  seedClient.end()
}

main()
