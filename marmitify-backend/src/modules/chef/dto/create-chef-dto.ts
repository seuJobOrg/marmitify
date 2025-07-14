import { IsString, IsOptional, IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';

export class CreateChefDto {
    @IsString()
    @MaxLength(15)
    phone: string;

    @IsString()
    description: string;

    @IsString()
    address: string;

    @IsString()
    email: string;

    constructor(partial: Partial<CreateChefDto>) {
        Object.assign(this, partial);
    }
}