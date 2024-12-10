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
} from '@/dtos/fasfac.dto'
import { Public } from '@/guards/auth.guard'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Causes')
@Public()
@Controller('cause')
// @ApiBearerAuth()
export class FasfacCauseController {
  constructor(private readonly fasfacCauseService: FasfacCauseService) {}

  @Post('create')
  @ApiResponse({ status: HttpStatus.CREATED, type: FasfacCauseDto })
  async createCause(@Body() createFasfacCauseDto: CreateFasfacCauseDto) {
    return this.fasfacCauseService.createCause(createFasfacCauseDto)
  }

  @Get('getAll')
  @ApiResponse({ status: HttpStatus.OK, type: FasfacCauseDto })
  async findAll() {
    return this.fasfacCauseService.findAll()
  }

  @Get('get/:id')
  @ApiResponse({ status: HttpStatus.OK, type: FasfacCauseDto })
  async findOne(@Param('id') id: number) {
    return this.fasfacCauseService.findOne(id)
  }

  @Put('update/:id')
  @ApiResponse({ status: HttpStatus.OK, type: FasfacCauseDto })
  async update(
    @Param('id') id: number,
    @Body() updateFasfacCauseDto: UpdateFasfacCauseDto
  ) {
    return this.fasfacCauseService.update(id, updateFasfacCauseDto)
  }

  @Delete('delete/:id')
  @ApiResponse({ status: HttpStatus.OK, type: DeleteFasfacCauseDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    return this.fasfacCauseService.delete(id)
  }
}
