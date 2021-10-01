import { Controller, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from 'app/lib/auth.guard';
@Controller('')
export class LoginController {

constructor(
    private readonly loginService: LoginService,
    ) {}

    // @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
       return this.loginService.createToken(loginDto.email, loginDto.password);
    }


    @Post('/logout')
    async logout(@Req() req: any): Promise<boolean> {
        return this.loginService.logout(req.token);
    }

}
