import { ApiProperty } from '@nestjs/swagger'
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
    description: 'Image URl'
  })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty({
    description: 'Short description of the cause',
    example: 'A brief overview of the cause.'
  })
  @IsOptional()
  @IsString()
  shortDescription?: string
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
    description: 'Short description of the cause',
    example: 'A brief overview of the cause.'
  })
  @IsOptional()
  @IsString()
  shortDescription?: string

  @ApiProperty({
    description: 'Image URl'
  })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty({
    description: 'Colour In #FFFFFF'
  })
  @IsOptional()
  @IsString()
  colour?: string
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
    description: 'Short description of the cause',
    example: 'A brief overview of the cause.'
  })
  @IsString()
  shortDescription?: string

  @ApiProperty({
    description: 'Image URL'
  })
  @IsString()
  imageUrl?: string

  @ApiProperty({
    description: 'Colour In #FFFFFF'
  })
  @IsString()
  colour?: string

}

export class DeleteFasfacCauseDto {
  @ApiProperty({
    description: 'Cause with id id deleted',
    example: 'Cause with id 1 deleted'
  })
  message: string
}
