import { Injectable } from '@nestjs/common'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import { fromEnv } from '@aws-sdk/credential-providers'

@Injectable()
export class EmailService {
  private ses: SESv2Client

  constructor() {
    this.ses = new SESv2Client({
      region: process.env.AWS_REGION,
      credentials: fromEnv()
    })
  }

  async sendEmail(to: string, subject: string, body: string) {
    const input = {
      FromEmailAddress: process.env.SENDER_EMAIL,
      Destination: {
        ToAddresses: [to]
      },
      Content: {
        Simple: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8'
          },
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: body
            }
          }
        }
      }
    }

    try {
      const command = new SendEmailCommand(input)
      const response = await this.ses.send(command)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
