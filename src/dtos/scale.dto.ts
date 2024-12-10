import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'

export class ScaleDto {
  @ApiProperty()
  kindness: number

  @ApiProperty()
  altruism: number

  @ApiProperty()
  righteousness: number

  @ApiProperty()
  mindfulness: number

  @ApiProperty()
  authenticity: number

  @ApiProperty()
  userId: number

  @ApiProperty()
  currentQuestionId: number

  @ApiProperty()
  completed: boolean

  @ApiProperty()
  resultEmailSent: boolean

  @ApiProperty()
  createdAt: string

  @ApiProperty()
  updatedAt: string
}

export interface Scale {
  kindness: number
  altruism: number
  righteousness: number
  mindfulness: number
  authenticity: number
}

export interface Score {
  id: number
  attribute: string
  score: number
}
export interface AIResponse {
  scores: Score[]
}

export class UpdateScaleDto {
  @ApiProperty()
  @IsInt()
  currentQuestionId: number
}
