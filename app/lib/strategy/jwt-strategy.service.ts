import { config } from 'app/config/config';
import passport = require('passport');
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { Logger, UnauthorizedException, NotAcceptableException, InternalServerErrorException, Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class JwtStrategyService {
    private readonly jwt: any;
    private  readonly logger: any;
    constructor() {
        this.jwt  = jwt;
        this.logger = Logger;
    }

    /**
     * Create a JWT based on parameters received
     * @param jti  - Unique identifier of the token.
     * @param iss  - The token issuer, used to indicate who issued the token.
     * @param sub  - user ID that the token being issued to.
     */
    async createToken( jti: number | string, iss: string, sub: number | string): Promise<string> {
        const token = {
            jti,
            iss,
            sub,
            iat: moment().unix()
        };

        const options = {
            algorithm: config.jwt.algorithm,
        };

        const privateKey = (iss + config.jwt.private_key) ;

        if (!privateKey) {
            this.logger.error('Unable to find find issuer private key');
            throw new UnauthorizedException('No private key found for issuer - ' + iss);
        }
        try {
                const data = await this.jwt.sign(token, privateKey, options);
                Logger.debug(JSON.stringify(data), "datadata")
            return data;
        } catch (exception) {
            throw new  InternalServerErrorException('Unable to generate JWT');
        }
    }

    /**
     * Verifies a JWT against the current issuer public key
     * @param token - The JWT token to verify
     * @param iss - The token issuer
     */
    async verifyToken(token: string, iss: string) {

        const publicKey = config.jwt[iss + '_public_key'];

        await Promise.resolve();
        if (!publicKey) {
            throw new UnauthorizedException('No public key found for issuer - ' + iss);
        }
        try {
            this.jwt.verify(token, publicKey);
            this.logger.log('login.token.validate.ok');
            return this.jwt.decode(token);
        } catch (exception) {
            this.logger.log('login.token.validate.error.invalid_token');
            this.logger.error('Unable to validate JWT token - ' + token);
            throw new NotAcceptableException('Invalid JWT provided');
        }
    }

}
