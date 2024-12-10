import { Injectable } from '@nestjs/common'
import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'
import { options, questions } from '@/drizzle/schema'
import { HINDI_LANG } from '@/drizzle/seeds/hindi-lang'

@Injectable()
export class SeederService {
  async seedHindiLanguage() {
    const questionsData = HINDI_LANG.QUESTION_DATA_WITH_IMAGE_CAPTION
    const optionsData = HINDI_LANG.OPTION_DATA

    for (let index = 0; index < questionsData.length; index++) {
      const currentQuestion = questionsData[index]

      const hindiObj = {
        title: currentQuestion.title,
        situation: currentQuestion.situation,
        imageCaption: currentQuestion.imageCaption
      }
      await db
        .update(questions)
        .set({ multiLanguage: { hindi: hindiObj } })
        .where(eq(questions.title, currentQuestion.question))
    }

    for (let j = 0; j < optionsData.length; j++) {
      const currentOption = optionsData[j]

      const hindiObj = {
        description: currentOption.hindiDescription
      }
      await db
        .update(options)
        .set({ multiLanguage: { hindi: hindiObj } })
        .where(eq(options.description, currentOption.description))
    }

    return questionsData
  }
}
