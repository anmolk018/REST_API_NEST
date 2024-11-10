import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/utils/auth-guard/auth-guard.guard';

@Controller('dashboard')
export class DashboardController {

    constructor(private userService: UsersService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('users')
    async getDashBoard() {
        return await this.userService.findAllUsers();
    }
}