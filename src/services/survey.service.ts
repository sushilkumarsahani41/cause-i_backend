import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { db } from '@/drizzle/db'
import { asc, desc, eq, and, countDistinct } from 'drizzle-orm'
import {
  feedbacks,
  options,
  questions,
  responses,
  scales,
  surveys
} from '@/drizzle/schema'
import {
  SurveyDto,
  QuestionDto,
  ScaleDto,
  CreateResponseDto,
  ResponseDto,
  CreateFeedbackDto,
  FeedbackDto
} from '@/dtos'
import _ from 'lodash'
import { ScoreCalculationService } from './score-calculation.service'

@Injectable()
export class SurveyService {
  constructor(
    private readonly scoreCalculationService: ScoreCalculationService
  ) {}

  async getAll(): Promise<SurveyDto[]> {
    return await db.query.surveys.findMany({
      limit: 5,
      orderBy: [asc(surveys.id)]
    })
  }

  async getOne(id: number): Promise<SurveyDto> {
    const survey = await db.query.surveys.findFirst({
      where: eq(surveys.id, id)
    })

    if (_.isEmpty(survey)) {
      throw new NotFoundException()
    } else {
      return survey
    }
  }

  async getAllQuestion(surveyId: number): Promise<QuestionDto[]> {
    return await db.query.questions.findMany({
      where: eq(questions.surveyId, surveyId),
      with: {
        options: {
          columns: {
            score: false
          },
          orderBy: [asc(options.id)]
        }
      },
      orderBy: [asc(questions.id)]
    })
  }

  async getSurveyResponseByUserId(
    surveyId: number,
    userId: number
  ): Promise<ResponseDto[]> {
    return await db.query.responses.findMany({
      where: and(
        eq(responses.surveyId, surveyId),
        eq(responses.respondentId, userId)
      )
    })
  }

  async createFeedback(
    surveyId: number,
    feedback: CreateFeedbackDto,
    userId: number
  ): Promise<FeedbackDto> {
    const feedbackResponse = await db
      .insert(feedbacks)
      .values({
        ...feedback,
        userId,
        surveyId
      })
      .returning()
      .catch((error) => {
        console.log(error)
        throw new BadRequestException()
      })

    return feedbackResponse[0]
  }

  async getFeedbackByUserId(
    surveyId: number,
    userId: number
  ): Promise<FeedbackDto> {
    const feedback = await db.query.feedbacks.findFirst({
      where: and(eq(feedbacks.surveyId, surveyId), eq(feedbacks.userId, userId))
    })

    if (_.isEmpty(feedback)) {
      throw new NotFoundException()
    } else {
      return feedback
    }
  }

  async upsertResponse(
    surveyId: number,
    response: CreateResponseDto,
    respondentId: number
  ): Promise<ResponseDto> {
    const updatedResponse = await db
      .insert(responses)
      .values({ ...response, surveyId, respondentId })
      .onConflictDoUpdate({
        target: [responses.questionId, responses.respondentId],
        set: { optionId: response.optionId, saqResponse: response.saqResponse }
      })
      .returning({
        surveyId: responses.surveyId,
        respondentId: responses.respondentId,
        questionId: responses.questionId,
        optionId: responses.optionId,
        saqResponse: responses.saqResponse,
        scoreCalculated: responses.scoreCalculated,
        createdAt: responses.createdAt,
        updatedAt: responses.updatedAt
      })

    return updatedResponse[0]
  }

  async markSurveyAsCompleteByUser(
    surveyId: number,
    userId: number
  ): Promise<ScaleDto> {
    const getScale = await db.query.scales.findFirst({
      where: eq(scales.userId, userId)
    })
    if (getScale.completed) {
      return getScale
    } else {
      const totalQuestion = await db
        .select({ value: countDistinct(questions.id) })
        .from(questions)
        .where(eq(questions.surveyId, surveyId))

      const totalQuestionCount = totalQuestion[0].value

      const getResponses = await db.query.responses.findMany({
        where: and(
          eq(responses.respondentId, userId),
          eq(responses.surveyId, surveyId)
        ),
        with: {
          option: {
            columns: {
              score: true
            }
          },
          question: {
            columns: {
              type: true,
              karmaAttribute: true
            }
          }
        },
        orderBy: [desc(responses.questionId)]
      })

      if (getResponses.length < totalQuestionCount) {
        throw new BadRequestException('Survey is incomplete.')
      }

      const getMcqResponses = getResponses.filter((response) =>
        _.isEmpty(response.saqResponse)
      )
      const getSaqResponses = getResponses.filter(
        (response) => !_.isEmpty(response.saqResponse)
      )

      let mcqScores = null
      let saqScores = null

      if (getMcqResponses.length > 0) {
        mcqScores =
          await this.scoreCalculationService.calculateMCQScores(getMcqResponses)
      }

      if (getSaqResponses.length > 0) {
        saqScores = await this.scoreCalculationService.calculateSAQScores(
          getSaqResponses,
          responses.respondentId
        )
      }
      const combinedScores = this.scoreCalculationService.combineScores(
        mcqScores,
        saqScores
      )

      const updatedScale = await this.scoreCalculationService.updateScales(
        userId,
        combinedScores
      )
      return updatedScale
    }
  }
}
