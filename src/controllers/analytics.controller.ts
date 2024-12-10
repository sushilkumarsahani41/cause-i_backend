import {
  Controller,
  Get,
  HttpStatus,
  Req,
  UnauthorizedException
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FeedbackReportDto } from '@/dtos'
import { AnalyticsService } from '@/services/analytics.service'
import { FastifyRequest } from 'fastify'

@ApiTags('analytics')
@Controller('analytics')
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: FeedbackReportDto,
    isArray: true
  })
  getFeedbackReport(@Req() request: FastifyRequest) {
    const user = request.user
    if (user.role !== 'admin') throw new UnauthorizedException()
    return this.analyticsService.getFeedbackReport()
  }
}
