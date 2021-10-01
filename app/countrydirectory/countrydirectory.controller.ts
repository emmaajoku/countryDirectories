import { IsNotEmptyObject, ArrayNotEmpty } from 'class-validator';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { CountrylayerService } from 'app/lib/countrylayer/countrylayer.service';
import { LoginService } from 'app/login/login.service';
import { JwtAuthGuard } from 'app/login/jwt-auth.guard';
import { RedisCache } from 'app/lib/redis/redis-cache';

@Controller('search')
export class CountrydirectoryController {
  constructor(
    private readonly countrylayerService: CountrylayerService,
    private readonly loginService: LoginService,
    private redisService: RedisCache
    )
   {}

  
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async searchCountry(@Req() req: any, @Query() params: any): Promise<any> {
      await this.loginService.verify(req?.user?.id);
      const paramsName: string = params.name;
      const rcesponseDataInRedis = await this.redisService.get(paramsName);
      if (rcesponseDataInRedis && IsNotEmptyObject(rcesponseDataInRedis) && ArrayNotEmpty(rcesponseDataInRedis)) {
        return rcesponseDataInRedis;
      }
      const responseData = await this.countrylayerService.makeApiCall(paramsName);
      return responseData;
    } 
  

}
