import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req
} from '@nestjs/common'
import { SurveyService } from '@/services/survey.service'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  QuestionDto,
  SurveyDto,
  ResponseDto,
  CreateResponseDto,
  ScaleDto
} from '@/dtos'
import { FastifyRequest } from 'fastify'
import { CreateFeedbackDto, FeedbackDto } from '@/dtos/feedback.dto'

@ApiTags('survey')
@Controller('surveys')
@ApiBearerAuth()
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}
  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: SurveyDto, isArray: true })
  getAll() {
    return this.surveyService.getAll()
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: SurveyDto })
  getOne(@Param('id') id: number) {
    return this.surveyService.getOne(+id)
  }

  @Get(':id/questions')
  @ApiResponse({ status: HttpStatus.OK, type: QuestionDto, isArray: true })
  getQuestions(@Param('id') surveyId: number) {
    return this.surveyService.getAllQuestion(+surveyId)
  }

  @Get(':id/responses')
  @ApiResponse({ status: HttpStatus.OK, type: ResponseDto, isArray: true })
  getSurveyResponse(
    @Param('id') surveyId: number,
    @Req() request: FastifyRequest
  ) {
    return this.surveyService.getSurveyResponseByUserId(
      +surveyId,
      request.user.id
    )
  }

  @Post(':id/response')
  @ApiResponse({ status: HttpStatus.OK, type: ResponseDto })
  @ApiBody({ type: CreateResponseDto })
  createResponse(
    @Param('id') surveyId: number,
    @Req() request: FastifyRequest,
    @Body() response: CreateResponseDto
  ) {
    const respondentId = request.user.id
    return this.surveyService.upsertResponse(+surveyId, response, respondentId)
  }

  @Get(':id/feedback')
  @ApiResponse({ status: HttpStatus.OK, type: FeedbackDto })
  getFeedback(@Param('id') surveyId: number, @Req() request: FastifyRequest) {
    const userId = request.user.id
    return this.surveyService.getFeedbackByUserId(+surveyId, userId)
  }

  @Post(':id/feedback')
  @ApiResponse({ status: HttpStatus.OK, type: FeedbackDto })
  @ApiBody({ type: CreateFeedbackDto })
  createFeedback(
    @Param('id') surveyId: number,
    @Req() request: FastifyRequest,
    @Body() feedback: CreateFeedbackDto
  ) {
    const userId = request.user.id
    return this.surveyService.createFeedback(+surveyId, feedback, userId)
  }

  @Post(':id/mark-as-complete')
  @ApiResponse({ status: HttpStatus.OK, type: ScaleDto })
  markAsComplete(
    @Param('id') surveyId: number,
    @Req() request: FastifyRequest
  ) {
    const userId = request.user.id
    return this.surveyService.markSurveyAsCompleteByUser(+surveyId, userId)
  }
}
