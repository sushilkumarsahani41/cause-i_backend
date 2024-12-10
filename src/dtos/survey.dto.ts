import { Status } from '@/core/enums'
import { ApiProperty } from '@nestjs/swagger'

export class SurveyDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty({ enum: Status, default: Status.DRAFT })
  status: string

  @ApiProperty()
  createdAt: string

  @ApiProperty()
  updatedAt: string
}
