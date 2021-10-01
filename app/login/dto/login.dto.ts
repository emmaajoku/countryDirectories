import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
    
    readonly token: string;

    readonly created_at: Date;

    readonly updated_at: Date;
}
