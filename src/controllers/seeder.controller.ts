import {
  Controller,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SeederService } from '@/services/seeder.service'

@ApiTags('seeder')
@Controller('seeders')
@ApiBearerAuth()
export class SeederController {
  constructor(private readonly seederService: SeederService) {}
  @Post('/seed-hindi-questions-answers')
  @ApiResponse({
    status: HttpStatus.OK
  })
  async seedHindiQuestionsAndOptions() {
    return await this.seederService.seedHindiLanguage()
  }
}
