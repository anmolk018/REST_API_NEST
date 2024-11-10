import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserLoginDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() userLoginDto: UserLoginDto) {
        return this.authService.authenticate(userLoginDto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.signUp(createUserDto);
        return { message: 'User created successfully', userId: user.id };
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    async refresh(@Body() body: { refreshToken: string }) {
        return this.authService.refreshAccessToken(body.refreshToken);
    }

}
