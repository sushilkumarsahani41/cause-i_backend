import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString
} from 'class-validator'

export class CreatePaymentDto {
  @ApiProperty({
    description: 'PayU Payment ID',
    example: '403993715533138898'
  })
  @IsNotEmpty()
  @IsString()
  mihpayid: string

  @ApiProperty({ description: 'Transaction ID', example: 'IM_1736439184693' })
  @IsNotEmpty()
  @IsString()
  txnid: string

  @ApiProperty({ description: 'Payment Amount', example: '5250.00' })
  @IsNotEmpty()
  @IsNumberString()
  amount: string

  @ApiProperty({
    description: 'Product Information',
    example: 'Donation on Social Cause'
  })
  @IsNotEmpty()
  @IsString()
  productinfo: string

  @ApiProperty({ description: 'First Name', example: 'Sushilkumar Sahani' })
  @IsNotEmpty()
  @IsString()
  firstname: string

  @ApiProperty({ description: 'Email Address', example: 'undefined' })
  @IsOptional()
  @IsString()
  email: string

  @ApiProperty({ description: 'Payment Status', example: 'success' })
  @IsNotEmpty()
  @IsString()
  status: string

  @ApiProperty({
    description: 'Bank Reference Number',
    example: '660031722674711000'
  })
  @IsOptional()
  @IsString()
  bank_ref_num: string

  @ApiProperty({ description: 'Phone Number', example: '9307918749' })
  @IsOptional()
  @IsString()
  phone: string

  @ApiProperty({ description: 'Payment Mode', example: 'DC' })
  @IsOptional()
  @IsString()
  mode: string

  @ApiProperty({
    description: 'Payment Hash',
    example: 'e441573e3a94719b7337c22f69d47716...'
  })
  @IsNotEmpty()
  @IsString()
  hash: string
}
