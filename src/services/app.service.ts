import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, Observable } from 'rxjs';
import { NewsInterface } from 'src/interfaces/news.interface';

@Injectable()
export class AppService {
  private readonly apiKey = 'STEAM_API_KEY'; 
  private readonly baseUrl = 'https://api.steampowered.com';

  constructor(
    private readonly httpService: HttpService
  ) {}

  async getNewsForApp(): Promise<NewsInterface[]> {

    const appId = 440;
    const count = 3;
    const maxLenght = 300;
    const format = 'json';
    const urlGetNews = `${this.baseUrl}/ISteamNews/GetNewsForApp/v002/?appid=${appId}&count=${count}&maxlength=${maxLenght}&format=${format}`

    const observable = this.httpService.get(urlGetNews).pipe(
      map((res) => {
        const items = res.data.appnews.newsitems;

        return items.map((item: any): NewsInterface => ({
          title: item.title,
          url: item.url,
          author: item.author,
          contents: item.contents,
          date: new Date(item.date * 1000).toISOString(),
          feedlabel: item.feedlabel,
          gameId: item.appid
        }));
      })
    );
    return firstValueFrom(observable); 
  }
}
