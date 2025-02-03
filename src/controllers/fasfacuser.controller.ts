import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpStatus,
  BadRequestException,
  NotFoundException
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth
} from '@nestjs/swagger'
import { FasfacUserPrefsService } from '@/services/fasfac-user.service'
import {
  CreateFasfacUserPrefsDto,
  FasfacUserPrefsDto,
  UpdateFasfacUserPrefsDto
} from '@/dtos/fasfac-user.dto'

@ApiTags('User Preferences')
@Controller('cause-user-prefs')
@ApiBearerAuth()
export class FasfacUserPrefsController {
  constructor(
    private readonly fasfacUserPrefsService: FasfacUserPrefsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user preference' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FasfacUserPrefsDto,
    description: 'User preference created successfully'
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiBody({ type: CreateFasfacUserPrefsDto })
  async create(@Body() createFasfacUserPrefsDto: CreateFasfacUserPrefsDto) {
    // Ensure required fields are present
    if (!createFasfacUserPrefsDto.userId || !createFasfacUserPrefsDto.causeId) {
      throw new BadRequestException('User ID and Cause ID are required')
    }

    try {
      return await this.fasfacUserPrefsService.create(createFasfacUserPrefsDto)
    } catch (error) {
      throw new BadRequestException(
        `Error creating user preference: ${error.message}`
      )
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all user preferences' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FasfacUserPrefsDto,
    isArray: true,
    description: 'List of all user preferences'
  })
  async findAll() {
    return this.fasfacUserPrefsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific user preference by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FasfacUserPrefsDto,
    description: 'User preference found'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User preference not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid ID format'
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user preference',
    type: Number
  })
  async findOne(@Param('id') id: number) {
    if (isNaN(id)) throw new BadRequestException('Invalid user preference ID')
    const userPref = await this.fasfacUserPrefsService.findOne(id)
    if (!userPref)
      throw new NotFoundException(`User preference with ID ${id} not found`)
    return userPref
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user preference by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FasfacUserPrefsDto,
    description: 'User preference updated successfully'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User preference not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid update data'
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user preference',
    type: Number
  })
  @ApiBody({ type: UpdateFasfacUserPrefsDto })
  async update(
    @Param('id') id: number,
    @Body() updateFasfacUserPrefsDto: UpdateFasfacUserPrefsDto
  ) {
    if (isNaN(id)) throw new BadRequestException('Invalid user preference ID')
    const updatedPref = await this.fasfacUserPrefsService.update(
      id,
      updateFasfacUserPrefsDto
    )
    if (!updatedPref)
      throw new NotFoundException(`User preference with ID ${id} not found`)
    return updatedPref
  }
}
