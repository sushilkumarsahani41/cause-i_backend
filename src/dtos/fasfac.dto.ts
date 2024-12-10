import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateFasfacCauseDto {
  @ApiProperty({
    description: 'Name of the cause',
    example: 'Education for All'
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Description of the cause',
    example: 'Providing free education to underprivileged children.'
  })
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty({
    description: 'Name of the cause in Hindi',
    example: 'सभी के लिए शिक्षा'
  })
  @IsOptional()
  @IsString()
  nameHindi?: string

  @ApiProperty({
    description: 'Description of the cause in Hindi',
    example: 'वंचित बच्चों को मुफ्त शिक्षा प्रदान करना।'
  })
  @IsOptional()
  @IsString()
  descriptionHindi?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  updatedAt?: string // Optional if `defaultNow` is used

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  createdAt?: string // O
}

export class UpdateFasfacCauseDto {
  @ApiProperty({
    description: 'Name of the cause',
    example: 'Education for All'
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    description: 'Description of the cause',
    example: 'Providing free education to underprivileged children.'
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({
    description: 'Name of the cause in Hindi',
    example: 'सभी के लिए शिक्षा'
  })
  @IsOptional()
  @IsString()
  nameHindi?: string

  @ApiProperty({
    description: 'Description of the cause in Hindi',
    example: 'वंचित बच्चों को मुफ्त शिक्षा प्रदान करना।'
  })
  @IsOptional()
  @IsString()
  descriptionHindi?: string

  updatedAt?: string // Optional if `defaultNow` is used
}

export class FasfacCauseDto {
  @ApiProperty({
    description: 'Unique identifier of the cause',
    example: 1
  })
  id: number

  @ApiProperty({
    description: 'Name of the cause',
    example: 'Education for All'
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Description of the cause',
    example: 'Providing free education to underprivileged children.'
  })
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty({
    description: 'Name of the cause in Hindi',
    example: 'सभी के लिए शिक्षा'
  })
  @IsString()
  nameHindi: string

  @ApiProperty({
    description: 'Description of the cause in Hindi',
    example: 'वंचित बच्चों को मुफ्त शिक्षा प्रदान करना।'
  })
  @IsString()
  descriptionHindi: string

  @ApiProperty({
    description: 'Timestamp when the cause was created',
    example: '2024-01-01T12:00:00Z'
  })
  createdAt: string

  @ApiProperty({
    description: 'Timestamp when the cause was last updated',
    example: '2024-01-02T15:30:00Z'
  })
  updatedAt: string
}

export class DeleteFasfacCauseDto {
  @ApiProperty({
    description: 'Cause with id id deleted',
    example: 'Cause with id 1 deleted'
  })
  message: string
}
