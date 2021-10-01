import { SignupData } from './../lib/utils';
import { AccountService } from 'app/account/account.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { matchPasswordHash } from 'app/lib/password-hash';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountService) {
    super();
  }

  async validateUser(email: string, password: string): Promise<SignupData> {
    const user = await this.accountService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordHash: boolean = await matchPasswordHash(password, user.password);
    if (passwordHash) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}