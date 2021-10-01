import {IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ProductUpdateDto {

    @IsNotEmpty({message: 'The status field is required'})
    @IsNumber()
    readonly status: number;

    @IsNotEmpty({message: 'The updated_by field is required'})
    @IsString({message:'The field should be a string'})
    readonly updated_by: string;
}