import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { ScaleDto, UpdateScaleDto } from '@/dtos'
import { AppService } from './app.service'
import { FastifyRequest } from 'fastify'
import { CauseLevelDto } from './dtos/cause-level.dto'

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('scale')
  @ApiResponse({ status: HttpStatus.OK, type: ScaleDto })
  getKarmaScale(@Req() request: FastifyRequest) {
    const userId = request.user.id
    return this.appService.getKarmaScale(userId)
  }

  @Get('cause-level')
  @ApiResponse({ status: HttpStatus.OK, type: CauseLevelDto })
  getCauseLevel(@Req() request: FastifyRequest) {
    const userId = request.user.id
    return this.appService.getCauseLevel(userId)
  }

  @Post('scale')
  @ApiResponse({ status: HttpStatus.OK, type: UpdateScaleDto })
  updateScaleCurrentQuestionId(
    @Req() request: FastifyRequest,
    @Body() body: UpdateScaleDto
  ) {
    const userId = request.user.id
    return this.appService.updateScaleCurrentQuestionId(
      userId,
      body.currentQuestionId
    )
  }

  @Post('send-result-email')
  @ApiResponse({ status: HttpStatus.OK, type: ScaleDto })
  sendResultEmail(@Req() request: FastifyRequest) {
    const userId = request.user.id
    return this.appService.sendResultEmail(userId)
  }
}
