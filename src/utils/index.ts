import { KARMA_ATTRIBUTES } from '@/core/constants'
import { ScaleDto } from '@/dtos'
import { AdviceDto } from '@/dtos/cause-level.dto'
import _ from 'lodash'

export function getHighestAndLowestAttributeLevelWithTotal(scale: ScaleDto) {
  // Pick the relevant attributes based on KARMA_ATTRIBUTES
  const pickedAttr = _.pick(scale, KARMA_ATTRIBUTES)

  // Convert the picked attributes into an array of objects with attribute and score
  const scoresArray = _.map(pickedAttr, (score, attribute) => ({
    attribute,
    score
  }))

  const totalScore = _.sumBy(scoresArray, 'score')

  const highestAttribute = _.maxBy(scoresArray, 'score')?.attribute

  const lowestAttribute = _.minBy(scoresArray, 'score')?.attribute
  return {
    highestAttribute,
    lowestAttribute,
    totalScore
  }
}

function capValue(value: number, decimals: number) {
  const multiplier = Math.pow(10, decimals)
  return Math.floor(value * multiplier) / multiplier
}

export function getMeanScore(totalScore: number, totalQuestions: number) {
  const value = totalScore / totalQuestions
  return capValue(value, 1)
}

export function transformToScores(scaleDto: ScaleDto) {
  const scores = [
    { attribute: 'Kindness', value: scaleDto.kindness, color: '#F576B6' },
    { attribute: 'Altruism', value: scaleDto.altruism, color: '#FAAE2A' },
    {
      attribute: 'Righteousness',
      value: scaleDto.righteousness,
      color: '#CAABD1'
    },
    { attribute: 'Mindfulness', value: scaleDto.mindfulness, color: '#90D1BD' },
    {
      attribute: 'Authenticity',
      value: scaleDto.authenticity,
      color: '#F7ED56'
    }
  ]

  return scores
}

export function filterBySection(objects: AdviceDto[]) {
  const matchingObjects = _.filter(objects, {
    section: 'What Makes You Different'
  })

  const nonMatchingObjects = _.reject(objects, {
    section: 'What Makes You Different'
  })

  return {
    matchingObjects,
    nonMatchingObjects
  }
}
