import { ApiProperty } from '@nestjs/swagger'
import { IsMutuallyExclusiveWith } from '@/validators/is-mutually-exclusive-with'
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateResponseDto {
  @ApiProperty()
  @IsInt()
  questionId: number

  @ApiProperty()
  @IsMutuallyExclusiveWith('saqResponse')
  optionId: number

  @ApiProperty()
  @MinLength(25)
  @MaxLength(250)
  @ValidateIf((o) => !o.optionId)
  saqResponse: string
}

export class CreateBulkResponseDto {
  @ApiProperty({ isArray: true, type: CreateResponseDto })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateResponseDto)
  responses: [CreateResponseDto]
}

export class ResponseDto {
  @ApiProperty()
  surveyId: number

  @ApiProperty()
  respondentId: number

  @ApiProperty()
  questionId: number

  @ApiProperty()
  optionId: number

  @ApiProperty()
  saqResponse: string

  @ApiProperty()
  scoreCalculated: boolean

  @ApiProperty()
  createdAt: string

  @ApiProperty()
  updatedAt: string
}
