import { config } from 'app/config/config';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.public_key,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    const { sub: id, username: email} = payload;
    return {
      id,
      email,
    };
  }

}