import { AccountRepository } from 'app/account/account.repository';
import { AccountModule } from './../account/account.module';
import { LoginModule } from '../login/login.module';
import { CountrylayerModule } from './../lib/countrylayer/countrylayer.module';
import { CountrylayerService } from './../lib/countrylayer/countrylayer.service';
import { HttpModule, Module } from '@nestjs/common';
import { CountrydirectoryService } from './countrydirectory.service';
import { CountrydirectoryController } from './countrydirectory.controller';
import { RedisCache } from 'app/lib/redis/redis-cache';
import { RedisInit } from 'app/lib/redis/redis.service';
import { LoginService } from 'app/login/login.service';
import { LoginRepository } from 'app/login/login.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from 'app/account/account.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'app/config/config';

@Module({
  imports : [
    TypeOrmModule.forFeature([LoginRepository, AccountRepository]),
    HttpModule, 
    CountrylayerModule, 
    LoginModule,
    AccountModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '12h',
        issuer: config.jwt.issuer,
        algorithm: 'RS256',
      },
      publicKey: config.jwt.public_key,
      privateKey: config.jwt.private_key,
    }),
  ],
  controllers: [CountrydirectoryController],
  providers: [
    CountrydirectoryService,
    CountrylayerService,
    RedisCache,
    RedisInit,
    LoginService,
    AccountService
  ]
})
export class CountrydirectoryModule {}
