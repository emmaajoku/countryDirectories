import { Account } from './../account/account.entity';
import { IsNotEmptyObject } from 'class-validator';
import { RedisCache } from 'app/lib/redis/redis-cache';
import { AccountService } from 'app/account/account.service';
import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException, HttpStatus, Logger } from '@nestjs/common';
import { LoginRepository } from './login.repository';
import { config } from 'app/config/config';
import { JwtService } from '@nestjs/jwt';

import moment = require('moment');
import { matchPasswordHash } from 'app/lib/password-hash';

@Injectable()
export class LoginService {
constructor(
    private readonly jwtService: JwtService,
    private loginRepositoty: LoginRepository,
    private accountService: AccountService,
    private redisService: RedisCache
    ) {}

    /**
     * Validates that a token is still valid/active
     * @param  {String} token   The JWT token provided by the user
     * @return {Boolean}         The logged in JWT token
     */
    async verify(id: string): Promise<boolean> {
        const tokenAttributes = await this.loginRepositoty.getLoginUserById(id);

        if (!tokenAttributes) {
            throw new BadRequestException('Token does not exist');
        }
        if (tokenAttributes && tokenAttributes.is_active !== 1) {
            throw new BadRequestException('Token is not active');
        }

        let clickCount: number;
        let userCounterDataInRedis = await this.redisService.get(`${tokenAttributes.email}userCounter`);
        const tokenDataInRedis = await this.redisService.get(tokenAttributes.email);
        await this.redisService.set(`${tokenAttributes.email}`, tokenAttributes.token, 60);

        if (userCounterDataInRedis && tokenDataInRedis && IsNotEmptyObject(userCounterDataInRedis) && 
            IsNotEmptyObject(tokenDataInRedis) && userCounterDataInRedis > config.max_rate_limit_counter) {
            throw new BadRequestException('You are being rate limiting, please wait for a minute and try again');
        }
        
        if (userCounterDataInRedis === null) {
            userCounterDataInRedis = 0;
        }

        clickCount = userCounterDataInRedis;
        clickCount++;
        await this.redisService.set(`${tokenAttributes.email}userCounter`, clickCount, 60);

        return true;
    }

    /**
     * 
     * @param token 
     * @param loginDto 
     * @returns {boolean}
     */
    async logout(id: string): Promise<boolean> {
       const userData = this.loginRepositoty.getLoginUserById(id);
        let tokenId: string;

        try {
            await this.loginRepositoty.logout(tokenId, 0);
            return true;

        } catch (err) {
            throw new BadRequestException(err);
        }
    }


    /**
     * 
     * @param email 
     * @param password 
     * @returns 
     */
     async validateUser(email: string, password: string): Promise<Account> {
        const user = await this.accountService.getUserByEmail(email);
        if (!user) {
          throw new UnauthorizedException('email is invalid');
        }
        const passwordHash: boolean = await matchPasswordHash(password, user.password);
        if (passwordHash) {
          return user;
        }
        throw new UnauthorizedException('password is invalid');
      }
    
       /**
     * Create a JWT based on parameters received
     * @param iss  - The token issuer, used to indicate who issued the token.
     * @param sub  - user ID that the token being issued to.
     */
    async createToken(email: string, password: string): Promise<object> {
        const validateUser = await this.validateUser(email, password);
        const payload = { 
            username: validateUser.email, 
            sub: validateUser.id,
            iat: moment().unix(),
            signOptions: {
                expiresIn: '12h',
                issuer: config.jwt.issuer,
                algorithm: 'RS256',
              },
              publicKey: config.jwt.public_key,
              privateKey: config.jwt.private_key,
        };

        const privateKey = config.jwt.private_key;

        if (!privateKey) {
             Logger.error('Unable to find find issuer private key');
            throw new UnauthorizedException('No private key found for issuer - ' + config.jwt.issuer,);
        }
         await this.loginRepositoty.createAuthenticationToken(validateUser.id, email);
        try {
            const jwtToken = this.jwtService.sign(payload);
            await this.loginRepositoty.saveAuthenticationToken(validateUser.id, jwtToken);
            const {password, ...account} = validateUser
            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                access_token: jwtToken,
                user: account,
              };

        } catch (exception) {
            console.log(exception)
            throw new  InternalServerErrorException('Unable to generate JWT');
        }
    }

    
}
