import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode
} from '@nestjs/common'
import { FasfacCauseService } from '@/services/fasfac-cause.service'
import {
  CreateFasfacCauseDto,
  DeleteFasfacCauseDto,
  FasfacCauseDto,
  UpdateFasfacCauseDto
} from '@/dtos/fasfac-causes.dto'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Causes')
@Controller('cause')
@ApiBearerAuth()
export class FasfacCauseController {
  constructor(private readonly fasfacCauseService: FasfacCauseService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: FasfacCauseDto })
  async createCause(@Body() createFasfacCauseDto: CreateFasfacCauseDto) {
    return this.fasfacCauseService.createCause(createFasfacCauseDto)
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: FasfacCauseDto })
  async findAll() {
    return this.fasfacCauseService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: FasfacCauseDto })
  async findOne(@Param('id') id: number) {
    return this.fasfacCauseService.findOne(id)
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: FasfacCauseDto })
  async update(
    @Param('id') id: number,
    @Body() updateFasfacCauseDto: UpdateFasfacCauseDto
  ) {
    return this.fasfacCauseService.update(id, updateFasfacCauseDto)
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: DeleteFasfacCauseDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    return this.fasfacCauseService.delete(id)
  }
}
