import {
  Controller,
  HttpStatus,
  Post,
  InternalServerErrorException
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation
} from '@nestjs/swagger'
import { SeederService } from '@/services/seeder.service'

@ApiTags('Seeder')
@Controller('seeders')
@ApiBearerAuth()
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('/seed-hindi-questions-answers')
  @ApiOperation({
    summary: 'Seed Hindi questions and answers into the database'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Seeding completed successfully'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred while seeding data'
  })
  async seedHindiQuestionsAndOptions() {
    try {
      return await this.seederService.seedHindiLanguage()
    } catch (error) {
      throw new InternalServerErrorException(`Seeding failed: ${error.message}`)
    }
  }
}
