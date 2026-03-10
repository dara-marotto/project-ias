import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('steam')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('news')
  async getPlayerSummary(
  ) {
    return this.appService.getPlayerSummary()
  }
}
