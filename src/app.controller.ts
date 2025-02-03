import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation
} from '@nestjs/swagger'
import { ScaleDto, UpdateScaleDto } from '@/dtos'
import { AppService } from './app.service'
import { FastifyRequest } from 'fastify'
import { CauseLevelDto } from './dtos/cause-level.dto'

@ApiTags('Application')
@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('scale')
  @ApiOperation({ summary: 'Retrieve user’s karma scale' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ScaleDto,
    description: 'Successfully retrieved user’s karma scale'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred'
  })
  getKarmaScale(@Req() request: FastifyRequest) {
    if (!request.user) {
      throw new UnauthorizedException('User is not authenticated')
    }
    try {
      return this.appService.getKarmaScale(request.user.id)
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving karma scale: ${error.message}`
      )
    }
  }

  @Get('cause-level')
  @ApiOperation({ summary: 'Retrieve user’s cause level' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CauseLevelDto,
    description: 'Successfully retrieved user’s cause level'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred'
  })
  getCauseLevel(@Req() request: FastifyRequest) {
    if (!request.user) {
      throw new UnauthorizedException('User is not authenticated')
    }
    try {
      return this.appService.getCauseLevel(request.user.id)
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving cause level: ${error.message}`
      )
    }
  }

  @Post('scale')
  @ApiOperation({
    summary: 'Update the user’s current question ID on the scale'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateScaleDto,
    description: 'Successfully updated the scale'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred'
  })
  updateScaleCurrentQuestionId(
    @Req() request: FastifyRequest,
    @Body() body: UpdateScaleDto
  ) {
    if (!request.user) {
      throw new UnauthorizedException('User is not authenticated')
    }
    if (!body.currentQuestionId) {
      throw new BadRequestException('Current question ID is required')
    }
    try {
      return this.appService.updateScaleCurrentQuestionId(
        request.user.id,
        body.currentQuestionId
      )
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating scale: ${error.message}`
      )
    }
  }

  @Post('send-result-email')
  @ApiOperation({ summary: 'Send the user’s result via email' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ScaleDto,
    description: 'Email sent successfully'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error sending result email'
  })
  sendResultEmail(@Req() request: FastifyRequest) {
    if (!request.user) {
      throw new UnauthorizedException('User is not authenticated')
    }
    try {
      return this.appService.sendResultEmail(request.user.id)
    } catch (error) {
      throw new InternalServerErrorException(
        `Error sending result email: ${error.message}`
      )
    }
  }
}
