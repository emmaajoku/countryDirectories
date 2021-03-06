import { config } from 'app/config/config';
import { RedisCache } from 'app/lib/redis/redis-cache';
import { AccountService } from './../account/account.service';
import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginRepository } from './login.repository';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { RedisInit } from 'app/lib/redis/redis.service';
import { AccountRepository } from 'app/account/account.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([LoginRepository, AccountRepository]),
        HttpModule,
        PassportModule,
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
      controllers: [LoginController],
      providers: [
        LoginService, 
        AccountService,
        RedisCache,
        RedisInit,
        PassportModule,
        LocalStrategy,
        JwtStrategy
      ],
      exports: [AccountService],
})
export class LoginModule {}
