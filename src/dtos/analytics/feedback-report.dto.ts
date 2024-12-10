import { ApiProperty } from '@nestjs/swagger'

export class FeedbackReportDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  rating: number

  @ApiProperty()
  comment?: string

  @ApiProperty()
  createdAt: string
}
