import { ApiProperty } from '@nestjs/swagger'
import { MaxLength, IsInt, IsOptional } from 'class-validator'

export class CreateFeedbackDto {
  @ApiProperty()
  @IsInt()
  rating: number

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(250)
  comment?: string
}

export class FeedbackDto {
  @ApiProperty()
  rating: number

  @ApiProperty()
  comment: string

  @ApiProperty()
  userId: number

  @ApiProperty()
  surveyId: number

  @ApiProperty()
  createdAt: string
}
