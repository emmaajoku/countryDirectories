import { Module , HttpModule} from '@nestjs/common';
import { RedisCache } from '../redis/redis-cache';
import { RedisInit } from '../redis/redis.service';
import { CountrylayerService } from './countrylayer.service';

@Module({
  imports : [HttpModule],
  providers: [
    CountrylayerService,
    RedisCache,
    RedisInit,
  ],
  exports: [CountrylayerService]
})
export class CountrylayerModule {}
