import {
  Controller,
  Get,
  HttpStatus,
  Req,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { FeedbackReportDto } from '@/dtos'
import { AnalyticsService } from '@/services/analytics.service'
import { FastifyRequest } from 'fastify'

@ApiTags('analytics')
@Controller('analytics')
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve feedback report (Admin only)' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FeedbackReportDto,
    isArray: true,
    description: 'Returns a list of feedback reports'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have admin privileges'
  })
  getFeedbackReport(@Req() request: FastifyRequest) {
    const user = request.user
    if (!user) {
      throw new UnauthorizedException('User is not authenticated')
    }
    if (user.role !== 'admin') {
      throw new ForbiddenException('Access denied. Admins only')
    }
    return this.analyticsService.getFeedbackReport()
  }
}
