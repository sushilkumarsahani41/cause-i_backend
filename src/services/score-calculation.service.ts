import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { db } from '@/drizzle/db'
import { eq, and } from 'drizzle-orm'
import { responses, scales } from '@/drizzle/schema'
import { ScaleDto } from '@/dtos'
import { type Scale } from '@/dtos/scale.dto'
import _ from 'lodash'
import { AIService } from './ai.service'

@Injectable()
export class ScoreCalculationService {
  constructor(private readonly aiService: AIService) {}

  async calculateMCQScores(data) {
    const attributeScores = {
      kindness: 0,
      altruism: 0,
      righteousness: 0,
      mindfulness: 0,
      authenticity: 0
    }

    for (const response of data) {
      const { score } = response.option
      const { karmaAttribute } = response.question

      if (attributeScores.hasOwnProperty(karmaAttribute)) {
        attributeScores[karmaAttribute] += score
      }
      await this.markResponseAsCalculated(
        response.questionId,
        response.respondentId
      )
    }

    return attributeScores
  }

  async calculateSAQScores(saqResponses, respondentId) {
    const aggregatedScores = {
      kindness: 0,
      altruism: 0,
      righteousness: 0,
      mindfulness: 0,
      authenticity: 0
    }

    const formattedData = saqResponses.map((response) => ({
      id: response.questionId,
      answer: response.saqResponse,
      attribute: response.question.karmaAttribute
    }))

    const predictedScores = await this.aiService.predictScore(
      JSON.stringify(formattedData)
    )
    const uniqScores = _.uniqWith(predictedScores.scores, (a, b) => {
      return a.id === b.id && a.attribute === b.attribute
    })
    for (const response of uniqScores) {
      if (aggregatedScores.hasOwnProperty(response.attribute)) {
        aggregatedScores[response.attribute] += response.score
      }
      await this.markResponseAsCalculated(response.id, respondentId)
    }
    return aggregatedScores
  }

  async updateScales(userId: number, combinedScores: Scale): Promise<ScaleDto> {
    const currentScales = await db.query.scales.findFirst({
      where: eq(scales.userId, userId)
    })

    const updatedScores = {
      kindness: currentScales.kindness + combinedScores.kindness,
      altruism: currentScales.altruism + combinedScores.altruism,
      righteousness: currentScales.righteousness + combinedScores.righteousness,
      mindfulness: currentScales.mindfulness + combinedScores.mindfulness,
      authenticity: currentScales.authenticity + combinedScores.authenticity,
      completed: true
    }
    const updatedScales = await db
      .update(scales)
      .set(updatedScores)
      .where(eq(scales.userId, userId))
      .returning()
      .catch((error) => {
        console.log(error)
        throw new InternalServerErrorException()
      })

    return updatedScales[0]
  }

  async markResponseAsCalculated(questionId: number, respondentId: number) {
    await db
      .update(responses)
      .set({ scoreCalculated: true })
      .where(
        and(
          eq(responses.questionId, questionId),
          eq(responses.respondentId, respondentId)
        )
      )
      .catch((error) => {
        console.log('MARKING RESPONSE AS CALCULATED: ', error)
        throw new InternalServerErrorException()
      })
  }

  combineScores(mcqScores: Scale, saqScores: Scale) {
    const combinedScores = _.mergeWith(
      {},
      mcqScores,
      saqScores,
      (objValue, srcValue) => {
        if (_.isNumber(objValue) && _.isNumber(srcValue)) {
          return objValue + srcValue
        }
        return _.isUndefined(objValue) ? srcValue : objValue
      }
    )

    return combinedScores
  }
}
