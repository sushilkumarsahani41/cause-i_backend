import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import qs from 'qs'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import metadata from './metadata'
import { ValidationPipe } from '@nestjs/common'
import { ALLOWED_ORIGINS } from './core/constants'
import { HttpExceptionFilter } from './filters/http-exception.filter'

const config = new DocumentBuilder()
  .setTitle('Cause I API')
  .setDescription('Cause I API Documentation')
  .setVersion('1.1')
  .addBearerAuth()
  .build()

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'UTC:yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname,reqId,responseTime,req,res',
            messageFormat: '{msg} [id={reqId} {req.method} {req.url}]'
          }
        }
      },
      ignoreTrailingSlash: true,
      caseSensitive: false,
      querystringParser: (str) => qs.parse(str)
    })
  )
  app.setGlobalPrefix('/v1')
  await SwaggerModule.loadPluginMetadata(metadata)
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/v1', app, document)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors({
    origin: ALLOWED_ORIGINS,
    methods: 'GET,HEAD,PATCH,POST',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
