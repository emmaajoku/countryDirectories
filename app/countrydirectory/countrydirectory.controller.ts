import { BadRequestException, Controller, Get, Query, Req, UseGuards, Logger } from '@nestjs/common';
import { CountrylayerService } from 'app/lib/countrylayer/countrylayer.service';
import { LoginService } from 'app/login/login.service';
import { CountrydirectoryService } from './countrydirectory.service';
import { JwtAuthGuard } from 'app/login/jwt-auth.guard';
import { createParamDecorator } from '@nestjs/common';

@Controller('search')
export class CountrydirectoryController {
  constructor(
    private readonly countrydirectoryService: CountrydirectoryService,
    private readonly countrylayerService: CountrylayerService,
    private readonly loginService: LoginService
    )
   {}

  
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async searchCountry(@Req() req: any, @Query() params: any): Promise<any> {
      await this.loginService.verify(req?.user?.id);
      const responseData = await this.countrylayerService.makeapicall(params.name);
      return responseData;
    } 
  

}
