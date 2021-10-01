import { Controller, Post, Body, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('')
export class LoginController {

constructor(
    private readonly loginService: LoginService,
    ) {}

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
       return this.loginService.createToken(loginDto.email, loginDto.password);
    }

    @Post('/logout')
    async logout(@Req() req: any): Promise<boolean> {
        return this.loginService.logout(req.token);
    }

}
