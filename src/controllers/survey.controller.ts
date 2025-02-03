import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'
import { SurveyService } from '@/services/survey.service'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
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
  @ApiOperation({ summary: 'Retrieve all surveys' })
  @ApiResponse({ status: HttpStatus.OK, type: SurveyDto, isArray: true })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getAll() {
    return this.surveyService.getAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific survey by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: SurveyDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid ID format'
  })
  getOne(@Param('id') id: number) {
    if (isNaN(id)) throw new BadRequestException('Invalid survey ID')
    return this.surveyService.getOne(+id)
  }

  @Get(':id/questions')
  @ApiOperation({ summary: 'Retrieve all questions of a survey' })
  @ApiResponse({ status: HttpStatus.OK, type: QuestionDto, isArray: true })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid survey ID'
  })
  getQuestions(@Param('id') surveyId: number) {
    if (isNaN(surveyId)) throw new BadRequestException('Invalid survey ID')
    return this.surveyService.getAllQuestion(+surveyId)
  }

  @Get(':id/responses')
  @ApiOperation({
    summary: 'Retrieve all responses for a survey by the current user'
  })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseDto, isArray: true })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey or responses not found'
  })
  getSurveyResponse(
    @Param('id') surveyId: number,
    @Req() request: FastifyRequest
  ) {
    if (!request.user) throw new UnauthorizedException('User not authenticated')
    return this.surveyService.getSurveyResponseByUserId(
      +surveyId,
      request.user.id
    )
  }

  @Post(':id/response')
  @ApiOperation({ summary: 'Submit a response to a survey' })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid response data'
  })
  @ApiBody({ type: CreateResponseDto })
  createResponse(
    @Param('id') surveyId: number,
    @Req() request: FastifyRequest,
    @Body() response: CreateResponseDto
  ) {
    if (!request.user) throw new UnauthorizedException('User not authenticated')
    return this.surveyService.upsertResponse(
      +surveyId,
      response,
      request.user.id
    )
  }

  @Get(':id/feedback')
  @ApiOperation({
    summary: 'Retrieve feedback for a survey by the current user'
  })
  @ApiResponse({ status: HttpStatus.OK, type: FeedbackDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Feedback not found'
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getFeedback(@Param('id') surveyId: number, @Req() request: FastifyRequest) {
    if (!request.user) throw new UnauthorizedException('User not authenticated')
    return this.surveyService.getFeedbackByUserId(+surveyId, request.user.id)
  }

  @Post(':id/feedback')
  @ApiOperation({ summary: 'Submit feedback for a survey' })
  @ApiResponse({ status: HttpStatus.OK, type: FeedbackDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid feedback data'
  })
  @ApiBody({ type: CreateFeedbackDto })
  createFeedback(
    @Param('id') surveyId: number,
    @Req() request: FastifyRequest,
    @Body() feedback: CreateFeedbackDto
  ) {
    if (!request.user) throw new UnauthorizedException('User not authenticated')
    return this.surveyService.createFeedback(
      +surveyId,
      feedback,
      request.user.id
    )
  }

  @Post(':id/mark-as-complete')
  @ApiOperation({ summary: 'Mark a survey as completed by the user' })
  @ApiResponse({ status: HttpStatus.OK, type: ScaleDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Survey not found'
  })
  markAsComplete(
    @Param('id') surveyId: number,
    @Req() request: FastifyRequest
  ) {
    if (!request.user) throw new UnauthorizedException('User not authenticated')
    return this.surveyService.markSurveyAsCompleteByUser(
      +surveyId,
      request.user.id
    )
  }
}
