import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @MinLength(3, { message: 'Name must be atleast 3 characters.' })
    name: string;

    @IsEmail({}, { message: 'Invalid Email.' })
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsString({ message: 'Organization must be a string.' })
    @MinLength(3, { message: 'Organization must be of 3 characters if entered.' })
    organization: string;
}

export class UserLoginDto {

    @IsEmail({}, { message: 'Invalid Email.' })
    email: string;

    @IsNotEmpty()
    password: string;
}