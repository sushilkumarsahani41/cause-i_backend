import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Res
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreatePaymentDto, PaymentDto } from '@/dtos/payuPayments.dto'
import { PaymentService } from '@/services/payuPayment.service'
import { Private, Public } from '@/guards/auth.guard'

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @Public()
  @ApiResponse({
    description: 'PayU Payment Response',
    type: CreatePaymentDto
  })
  // @Redirect('https://docs.nestjs.com', 302)
  async createPayment(@Body() createPaymentDto: CreatePaymentDto, @Res() res) {
    await this.paymentService.createPayment(createPaymentDto)
    // Redirect to confirmation page or success URL
    return res.redirect(
      `https://uat.fasfac.cause-i.ai/verify-payment?txnid=${createPaymentDto.txnid}`
    )
  }

  @Get()
  @Private()
  @ApiResponse({
    description: 'PayU Payment Response',
    type: PaymentDto
  })
  async getAllPayments() {
    return this.paymentService.getAllPayments()
  }

  @Get(':txnid')
  @Private()
  @ApiResponse({
    description: 'PayU Payment Response',
    type: PaymentDto
  })
  async getPaymentByTxnId(@Param('txnid') txnid: string) {
    return this.paymentService.getPaymentByTxnId(txnid)
  }
}
