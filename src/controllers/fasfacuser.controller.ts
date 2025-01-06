import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common'
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
    status: 201,
    description: 'User preference created successfully'
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiBody({ type: CreateFasfacUserPrefsDto })
  async create(@Body() createFasfacUserPrefsDto: CreateFasfacUserPrefsDto) {
    return this.fasfacUserPrefsService.create(createFasfacUserPrefsDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all user preferences' })
  @ApiResponse({ status: 200, description: 'List of user preferences' })
  async findAll() {
    return this.fasfacUserPrefsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific user preference by ID' })
  @ApiResponse({ status: 200, description: 'User preference found' })
  @ApiResponse({ status: 404, description: 'User preference not found' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user preference',
    type: Number
  })
  async findOne(@Param('id') id: number) {
    return this.fasfacUserPrefsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user preference by ID' })
  @ApiResponse({
    status: 200,
    description: 'User preference updated successfully'
  })
  @ApiResponse({ status: 404, description: 'User preference not found' })
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
    return this.fasfacUserPrefsService.update(id, updateFasfacUserPrefsDto)
  }
}
