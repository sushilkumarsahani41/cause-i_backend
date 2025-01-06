import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'

// DTO for creating a new entry
export class CreateFasfacUserPrefsDto {
  @ApiProperty({ description: 'ID of the user', example: 123 })
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @ApiProperty({ description: 'ID of the cause', example: 456 })
  @IsNotEmpty()
  @IsNumber()
  causeId: number

  @IsOptional()
  @IsString()
  createdAt?: string

  @IsOptional()
  @IsString()
  updatedAt?: string
}

// DTO for patching additional fields
export class UpdateFasfacUserPrefsDto {
  @ApiProperty({
    description: 'Amount pledged by the user',
    example: 100.5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  amountPledged?: number

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    required: false
  })
  @IsOptional()
  @IsString()
  fullName?: string

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
    required: false
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string

  @ApiProperty({ description: 'Age of the user', example: 30, required: false })
  @IsOptional()
  @IsNumber()
  age?: number

  @ApiProperty({
    description: 'Gender of the user',
    example: 'Male',
    required: false
  })
  @IsOptional()
  @IsString()
  gender?: string

  @ApiProperty({
    description: 'Nationality of the user',
    example: 'Indian',
    required: false
  })
  @IsOptional()
  @IsString()
  nationality?: string

  @ApiProperty({
    description: 'Profession of the user',
    example: 'Engineer',
    required: false
  })
  @IsOptional()
  @IsString()
  profession?: string

  @ApiProperty({
    description: 'Payment ID for the transaction',
    example: 'pay_12345',
    required: false
  })
  @IsOptional()
  @IsString()
  paymentId?: string

  @IsOptional()
  @IsString()
  updatedAt?: string
}
