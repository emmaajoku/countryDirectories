import {IsNotEmpty, IsString, IsEmail, MinLength} from 'class-validator';
import { IsEqualTo} from './custom-validators';

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    readonly firstname: string;

    @IsNotEmpty()
    @IsString()
    readonly lastname: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    readonly phone_number?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @IsEqualTo('password')
    confirm_password: string;

}