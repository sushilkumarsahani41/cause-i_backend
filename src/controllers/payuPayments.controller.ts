import { Body, Controller, Get, Param, Post, Redirect, Res } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger'
import { CreatePaymentDto } from '@/dtos/payuPayments.dto'
import { PaymentService } from '@/services/payuPayment.service'
import { Private, Public } from '@/guards/auth.guard'

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @Public()
  @Redirect('https://docs.nestjs.com', 301)
  async createPayment(@Body() createPaymentDto: CreatePaymentDto, @Res() res) {
    await this.paymentService.createPayment(createPaymentDto)
    // Redirect to confirmation page or success URL
    return {
      status: 201,
      message: 'Payment created successfully.'
    }
  }

  @Get()
  @Private()
  async getAllPayments() {
    return this.paymentService.getAllPayments()
  }

  @Get(':txnid')
  @Private()
  async getPaymentByTxnId(@Param('txnid') txnid: string) {
    return this.paymentService.getPaymentByTxnId(txnid)
  }
}
