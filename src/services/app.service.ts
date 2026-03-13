import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, Observable } from 'rxjs';
import { NewsInterface } from 'src/interfaces/news.interface';
import { OwnedGamesInterface } from 'src/interfaces/owned-games.interface';

@Injectable()
export class AppService {
  private readonly apiKey = 'F940CBCFCF809E53E10C206CD6A8EFEB'; 
  private readonly baseUrl = 'https://api.steampowered.com';
  private readonly stamId = '76561199208731819';


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

  async getOwnedGames(): Promise<OwnedGamesInterface[]> {
    
    const urlGetPlayerSummaries = `${this.baseUrl}/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKey}&steamid=${this.stamId}&format=json`;

    const observable = this.httpService.get(urlGetPlayerSummaries).pipe(
      map((res) => {
        const items = res.data.response.games;

        return items.map((item: any) => ({
          gameId: item.appid,
          playedTime: item.playtime_forever,
          lastPlayedDate: item.rtime_last_played ? new Date(item.rtime_last_played * 1000).toISOString() : 'Never Played',
        }))
      })
    );
    return firstValueFrom(observable);
  }
}
