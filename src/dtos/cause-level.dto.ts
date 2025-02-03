import { ApiProperty } from '@nestjs/swagger'
import { ScaleDto } from './scale.dto'

export class AdviceDto {
  @ApiProperty()
  section: string

  @ApiProperty()
  content: string

  @ApiProperty()
  imgUrl?: string
}

export class CharacteristicDto {
  @ApiProperty()
  trait: string

  @ApiProperty()
  description: string

  @ApiProperty()
  imgUrl: string
}

export class CauseLevelDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  totalScore: number

  @ApiProperty()
  meanScore: number

  @ApiProperty()
  imgUrl: string

  @ApiProperty()
  highestAttribute: string

  @ApiProperty()
  lowestAttribute: string

  @ApiProperty()
  description: string

  @ApiProperty({ type: [CharacteristicDto] })
  characteristics: CharacteristicDto[]

  @ApiProperty({ type: [AdviceDto] })
  advices: AdviceDto[]

  @ApiProperty({ type: ScaleDto })
  scale: ScaleDto
}

export class SuccessDto {
  @ApiProperty()
  success: boolean

  @ApiProperty()
  message: string
}
