import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/auth')
    @UseGuards(IsLogedInGuard)
    auth(@Req() req: Request){
        return this.authService.auth(req);
    }

    @Get('/logout')
    @UseGuards(IsLogedInGuard)
    logout(@Req() req: Request){
        return this.authService.logout(req);
    }

    @Post('/registration')
    @HttpCode(201)
    registration(@Body() dto: RegistrationDto){
        return this.authService.registration(dto);
    }

    @Post('/login')
    login(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }
}
