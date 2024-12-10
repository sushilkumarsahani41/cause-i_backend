import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { authDb, db } from '@/drizzle/db'
import { countDistinct, eq, sql } from 'drizzle-orm'
import { questions, scales } from '@/drizzle/schema'
import { ScaleDto, UpdateScaleDto } from '@/dtos'
import _ from 'lodash'
import {
  getHighestAndLowestAttributeLevelWithTotal,
  getMeanScore
} from './utils'
import { CauseLevelDto } from './dtos/cause-level.dto'
import { users } from './drizzle/auth-schema'
import { EmailService } from './services/email.service'
import { render } from '@react-email/components'
import CivicScaleResult from './templates/result'
import { RESULT_EMAIL_SUBJECT } from './core/constants'

@Injectable()
export class AppService {
  constructor(private readonly emailService: EmailService) {}

  async getKarmaScale(userId: number): Promise<ScaleDto> {
    const karmaScale = await db.query.scales.findFirst({
      where: eq(scales.userId, userId)
    })

    if (_.isEmpty(karmaScale)) {
      throw new NotFoundException()
    } else {
      return karmaScale
    }
  }

  async updateScaleCurrentQuestionId(
    userId: number,
    currentQuestionId: number
  ): Promise<UpdateScaleDto> {
    const updatedCurrentQuestionId = await db
      .insert(scales)
      .values({ userId, currentQuestionId })
      .onConflictDoUpdate({
        target: [scales.userId],
        set: { currentQuestionId }
      })
      .returning({
        currentQuestionId: scales.currentQuestionId
      })

    return updatedCurrentQuestionId[0]
  }

  async getCauseLevel(userId: number): Promise<CauseLevelDto> {
    const karmaScale = await db.query.scales.findFirst({
      where: eq(scales.userId, userId)
    })

    if (_.isEmpty(karmaScale) || karmaScale.completed === false) {
      throw new NotFoundException()
    }

    const karmaScoreInfo =
      getHighestAndLowestAttributeLevelWithTotal(karmaScale)

    const getUserCauseLevel = await db.query.causeLevels.findFirst({
      where: sql`${karmaScoreInfo.totalScore} BETWEEN "causeLevels"."min_score" AND "causeLevels"."max_score"`,
      columns: {
        id: true,
        name: true,
        description: true,
        imgUrl: true
      },
      with: {
        characteristics: {
          columns: {
            trait: true,
            imgUrl: true,
            description: true
          }
        },
        advices: {
          columns: {
            section: true,
            imgUrl: true,
            content: true
          }
        }
      }
    })

    const totalQuestionsQuery = await db
      .select({ value: countDistinct(questions.id) })
      .from(questions)

    const totalQuestions = totalQuestionsQuery[0].value
    const meanScore = getMeanScore(karmaScoreInfo.totalScore, totalQuestions)

    const causeLevel = {
      ...getUserCauseLevel,
      totalScore: karmaScoreInfo.totalScore,
      highestAttribute: karmaScoreInfo.highestAttribute,
      lowestAttribute: karmaScoreInfo.lowestAttribute,
      meanScore: meanScore,
      scale: karmaScale
    }

    return causeLevel
  }

  async sendResultEmail(userId: number): Promise<ScaleDto> {
    const getUser = await authDb.query.users.findFirst({
      where: eq(users.id, userId)
    })
    const causeLevel = await this.getCauseLevel(getUser.id)

    if (causeLevel.scale.resultEmailSent) {
      return causeLevel.scale
    }

    const transformedEmail = render(
      CivicScaleResult({ causeLevel: causeLevel, userName: getUser.name })
    )

    const sendEmail = await this.emailService.sendEmail(
      getUser.email,
      RESULT_EMAIL_SUBJECT,
      transformedEmail
    )

    if (sendEmail.MessageId) {
      const updatedScale = await db
        .update(scales)
        .set({
          resultEmailSent: true
        })
        .returning()
      const scale = updatedScale[0]
      return scale
    } else {
      console.log(sendEmail)
      throw new InternalServerErrorException()
    }
  }
}
