import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@/guards/auth.guard'
import {
  AnalyticsController,
  SeederController,
  SurveyController,
  FasfacCauseController,
  FasfacUserPrefsController,
  PaymentController
} from '@/controllers'
import {
  SurveyService,
  JwtService,
  AIService,
  ScoreCalculationService
} from '@/services'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EmailService } from './services/email.service'
import { AnalyticsService } from './services/analytics.service'
import { SeederService } from './services/seeder.service'
import { FasfacCauseService } from '@/services/fasfac-cause.service'
import { FasfacUserPrefsService } from '@/services/fasfac-user.service'
import { PaymentService } from '@/services/payuPayment.service'

@Module({
  imports: [],
  controllers: [
    AppController,
    FasfacCauseController,
    FasfacUserPrefsController,
    PaymentController,
    SurveyController,
    AnalyticsController,
    SeederController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    JwtService,
    AIService,
    EmailService,
    AppService,
    FasfacCauseService,
    FasfacUserPrefsService,
    PaymentService,
    SurveyService,
    AnalyticsService,
    ScoreCalculationService,
    SeederService
  ]
})
export class AppModule {}
