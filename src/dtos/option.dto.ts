import { ApiProperty } from '@nestjs/swagger'

export class OptionDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  description: string

  @ApiProperty()
  createdAt: string

  @ApiProperty()
  updatedAt: string

  @ApiProperty()
  questionId: number
}

export class OptionWithScoreDto extends OptionDto {
  @ApiProperty()
  score: number
}
