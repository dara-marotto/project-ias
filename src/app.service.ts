import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppService {
  private readonly apiKey = 'STEAM_API_KEY'; 
  private readonly baseUrl = 'https://api.steampowered.com';

  constructor(
    private readonly httpService: HttpService
  ) {}

  async getPlayerSummary(): Promise<any> {
    const appId = 440;
    const count = 3;
    const maxLenght = 300;
    const format = 'json';
    const url = `${this.baseUrl}/ISteamNews/GetNewsForApp/v002/?appid=${appId}&count=${count}&maxlength=${maxLenght}&format=${format}`

    const response = await firstValueFrom(this.httpService.get(url))
    return response.data;
  }
}
