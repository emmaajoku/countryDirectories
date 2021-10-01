import { Controller, Post, Req, Body, Get, Param, HttpException, HttpStatus, Query, LoggerService } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AccountService } from './account.service';

@Controller('')
export class AccountController {

    constructor(
        private readonly accountService: AccountService,
        ) {}

    @Post('signup')
    async signUp(@Body() requestBody: SignUpDto): Promise<unknown> {
        return this.accountService.signUp(requestBody);
    }


   
}
