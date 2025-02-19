import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'
import { FastifyReply } from 'fastify'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()
    let message = exceptionResponse['message']

    // Convert message to array if it's a string
    if (typeof message === 'string') {
      message = [message]
    }

    response.status(status).send({
      statusCode: status,
      error: exceptionResponse['error'] || exception.message,
      message
    })
  }
}
