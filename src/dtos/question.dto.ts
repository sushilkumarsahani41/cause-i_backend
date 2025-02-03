import { QuestionTypes, Status } from '@/core/enums'
import { ApiProperty } from '@nestjs/swagger'
import { OptionDto } from './option.dto'

export class QuestionDto {
  @ApiProperty()
  id: number

  @ApiProperty({ enum: QuestionTypes })
  type: string

  @ApiProperty()
  title: string

  @ApiProperty()
  situation: string

  @ApiProperty()
  imageUrl: string

  @ApiProperty()
  imageCaption: string

  @ApiProperty({ enum: Status })
  status: string

  @ApiProperty()
  karmaAttribute: string

  @ApiProperty()
  createdAt: string

  @ApiProperty()
  updatedAt: string

  @ApiProperty()
  surveyId: number

  @ApiProperty({ isArray: true, type: OptionDto })
  options: OptionDto[]
}
