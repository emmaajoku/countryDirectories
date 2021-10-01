import { IsNotEmpty } from 'class-validator';
import { LoginDto } from './login.dto';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class UpdateLoginDto extends PartialType(LoginDto) {
    @ApiProperty()
    @IsNotEmpty()
    is_active: number;
}
