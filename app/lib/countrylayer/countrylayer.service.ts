import { HttpException } from '@nestjs/common';
import { Injectable, HttpService, Logger } from '@nestjs/common';
import { config } from 'app/config/config';
import { RedisCache } from '../redis/redis-cache';
import { ArrayNotEmpty, IsNotEmptyObject } from 'class-validator';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CountrylayerService {

    constructor(private httpService: HttpService,
        private readonly redisService: RedisCache
        ) {}
    
     makeapicall = async (countryName: string) => {
        const searchQueryExist = await this.redisService.get(countryName);

        if (searchQueryExist && IsNotEmptyObject(searchQueryExist) && ArrayNotEmpty(searchQueryExist)) {
            return  searchQueryExist;
        }

        const fullUrl = `${config.countrylayer.baseurl}name/${countryName}?access_key=${config.countrylayer.api_key}&FullText=${true}` 
        
        const response = await this.httpService.get(fullUrl).pipe(
            map(res => res.data),
        catchError(e => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
      return response; 
    }
}
