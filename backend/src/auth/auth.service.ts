import { BadRequestException, Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { hash, verify } from 'argon2';
import { Users } from 'src/users/entities/users.entity';
import { CreateUserDto, UserLoginDto } from 'src/users/dto/user.dto';
import { JWT_REFRESH_EXPIRES, JWT_REFRESH_SECRET } from 'src/config';

type SignInData = { userId: number, userName: string, userEmail: string };
type AuthResult = { accessToken: string, refreshToken: string, userId: number, userName: string }

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async authenticate(userLoginDto: UserLoginDto): Promise<AuthResult> {
        const user = await this.validateUser(userLoginDto);
        if (!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }
        return this.signIn(user);
    }

    async signUp(createUserDto: CreateUserDto): Promise<Users> {
        const { email, password } = createUserDto;
        const existingUser = await this.userService.findUserByEmail(email);
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }
        try {
            const hashedPassword = await hash(password);
            return this.userService.saveUser({ ...createUserDto, password: hashedPassword });
        } catch (err) {
            throw new InternalServerErrorException('Something Went Wrong');
        }
    }

    private async validateUser(userLoginDto: UserLoginDto): Promise<SignInData | null> {
        try {
            const user = await this.userService.findUserByEmail(userLoginDto.email)
            if (user?.password && await verify(user.password, userLoginDto.password)) {
                return {
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email
                }
            }
            return null;
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException('Something Went Wrong');
        }
    }

    private async signIn(user: SignInData): Promise<AuthResult> {
        try {
            const tokenPayload = {
                sub: user.userId,
                userName: user.userName,
                userEmail: user.userEmail
            };
            const accessToken = await this.jwtService.signAsync(tokenPayload);
            const refreshToken = await this.jwtService.signAsync(tokenPayload, {
                secret: JWT_REFRESH_SECRET,
                expiresIn: JWT_REFRESH_EXPIRES,
            });
            return { accessToken, refreshToken, userName: user.userName, userId: user.userId };
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException('Something Went Wrong');
        }

    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const decoded = this.jwtService.verify(refreshToken, {
                secret: JWT_REFRESH_SECRET,
            });
            const tokenPayload = {
                sub: decoded.userId,
                userName: decoded.userName,
                userEmail: decoded.userEmail
            };
            const newAccessToken = await this.jwtService.signAsync(tokenPayload);
            return { accessToken: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
