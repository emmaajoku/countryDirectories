import { CountrylayerModule } from './lib/countrylayer/countrylayer.module';
import { Module, CacheModule } from '@nestjs/common';
import { AppController } from 'app/app.controller';
import { AppService } from 'app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { config } from 'app/config/config';
import { AccountModule } from './account/account.module';
import { RedisModule } from './lib/redis/redis.module';
import { LoginModule } from './login/login.module';
import { CountrydirectoryModule } from './countrydirectory/countrydirectory.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    LoginModule,
    AccountModule,
    RedisModule,
    CountrylayerModule,
    CacheModule.register(
      {
        store: redisStore,
        host: config.redis.host,
        port: config.redis.port,
        database: config.redis.db,
        ttl: 172800,
        max: 300000,
      },
    ),
    CountrydirectoryModule,
  ], controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection)
  {}
}
