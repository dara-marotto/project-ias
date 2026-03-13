import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('steam')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('news')
  async getPlayerSummary() {
    return await this.appService.getNewsForApp()
  }

  @Get('owned-games')
  async getOwnedGames() {
    return await this.appService.getOwnedGames(); 
  }
}
