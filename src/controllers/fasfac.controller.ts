import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  BadRequestException,
  NotFoundException
} from '@nestjs/common'
import { FasfacCauseService } from '@/services/fasfac-cause.service'
import {
  CreateFasfacCauseDto,
  FasfacCauseDto,
  UpdateFasfacCauseDto
} from '@/dtos/fasfac-causes.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

@ApiTags('Causes')
@Controller('cause')
@ApiBearerAuth()
export class FasfacCauseController {
  constructor(private readonly fasfacCauseService: FasfacCauseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cause' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FasfacCauseDto,
    description: 'Cause successfully created'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided'
  })
  async createCause(@Body() createFasfacCauseDto: CreateFasfacCauseDto) {
    if (!createFasfacCauseDto.name) {
      throw new BadRequestException('Cause name is required')
    }
    return this.fasfacCauseService.createCause(createFasfacCauseDto)
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all causes' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FasfacCauseDto,
    isArray: true,
    description: 'List of all causes'
  })
  async findAll() {
    return this.fasfacCauseService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single cause by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FasfacCauseDto,
    description: 'Cause found'
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cause not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid ID format'
  })
  async findOne(@Param('id') id: number) {
    if (isNaN(id)) throw new BadRequestException('Invalid cause ID')
    const cause = await this.fasfacCauseService.findOne(id)
    if (!cause) throw new NotFoundException(`Cause with ID ${id} not found`)
    return cause
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing cause' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FasfacCauseDto,
    description: 'Cause updated successfully'
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cause not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid update data'
  })
  async update(
    @Param('id') id: number,
    @Body() updateFasfacCauseDto: UpdateFasfacCauseDto
  ) {
    if (isNaN(id)) throw new BadRequestException('Invalid cause ID')
    const updatedCause = await this.fasfacCauseService.update(
      id,
      updateFasfacCauseDto
    )
    if (!updatedCause)
      throw new NotFoundException(`Cause with ID ${id} not found`)
    return updatedCause
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cause by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Cause deleted successfully'
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cause not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid ID format'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    if (isNaN(id)) throw new BadRequestException('Invalid cause ID')
    const deleted = await this.fasfacCauseService.delete(id)
    if (!deleted) throw new NotFoundException(`Cause with ID ${id} not found`)
  }
}
