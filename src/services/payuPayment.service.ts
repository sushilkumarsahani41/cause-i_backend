import { Injectable } from '@nestjs/common'
import { db } from '@/drizzle/db'
import { payments } from '@/drizzle/schema' // Assuming Drizzle ORM setup
import { CreatePaymentDto } from '@/dtos/payuPayments.dto'
import { eq } from "drizzle-orm";

@Injectable()
export class PaymentService {
  async createPayment(paymentDto: CreatePaymentDto) {
    try {
      // Insert selected fields into the database
      await db.insert(payments).values({
        mihpayid: paymentDto.mihpayid,
        txnid: paymentDto.txnid,
        amount: paymentDto.amount,
        productinfo: paymentDto.productinfo,
        firstname: paymentDto.firstname,
        email: paymentDto.email,
        status: paymentDto.status,
        bank_ref_num: paymentDto.bank_ref_num,
        phone: paymentDto.phone,
        mode: paymentDto.mode,
        hash: paymentDto.hash
      })
      return { message: 'Payment saved successfully' }
    } catch (error) {
      throw new Error(`Failed to save payment: ${error.message}`)
    }
  }

  async getAllPayments() {
    return await db.select().from(payments)
  }

  async getPaymentByTxnId(txnid: string) {
    const payment = await db
      .select()
      .from(payments)
      .where(eq(payments.txnid,txnid))
      .limit(1)
    if (!payment.length) {
      throw new Error(`Payment with txnid ${txnid} not found`)
    }
    return payment[0]
  }
}
