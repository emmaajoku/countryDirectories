import { LoginRepository } from './../login/login.repository';
import { LoginService } from './../login/login.service';
import { Module, Logger, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from 'app/account/account.repository';
import { AccountService } from 'app/account/account.service';
import { AccountController } from 'app/account/account.controller';
import { RedisCache } from '../lib/redis/redis-cache';
import { JwtStrategyService } from 'app/lib/strategy/jwt-strategy.service';
import { RedisInit } from 'app/lib/redis/redis.service';
import { LoginModule } from 'app/login/login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository, LoginRepository]), 
    HttpModule,
  ],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [
    AccountService,
    RedisCache,
    RedisInit,
    Logger,
    JwtStrategyService
  ],
})

export class AccountModule {}
