import { Body, Controller, Get, HttpCode, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Request } from 'express';
import { registrationMapper } from './mappers/registration.mapper';
import { loginMapper } from './mappers/login.mapper';
import { AdminRepository } from 'src/admin/admin.repository';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/token/token.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
                private adminRepository: AdminRepository,
                private tokenService: TokenService) {}

    @Get('/auth')
    @UseGuards(IsLogedInGuard)
    async auth(@Req() req: Request){
        const adminReq = req.admin;
        const admin = await this.adminRepository.getOneById(adminReq.id);
        if(!admin)
            throw new HttpException('The admin was not found.', 404);
        const token = await this.tokenService.generateToken(admin);
        if(!token)
            throw new HttpException('Error creating token.', 400);
        await this.tokenService.saveToken(admin.id, token);
        return { token };
    }

    @Get('/logout')
    @UseGuards(IsLogedInGuard)
    async logout(@Req() req: Request){
        const adminReq = req.admin;
        const admin = await this.adminRepository.getOneById(adminReq.id);
        if(!admin)
            throw new HttpException('The admin was not found.', 404);
        const token = await this.tokenService.getOneByAdminId(admin.id);
        if(!token)
            throw new HttpException('The token was not found.', 404);
        await this.tokenService.disactivateToken(token);
        return { message: 'Logout has been executed successfully.' };
    }

    @Post('/registration')
    @HttpCode(201)
    async registration(@Body() dto: RegistrationDto){
        dto = registrationMapper.fromControllerToService(dto);
        const checkAdminExisting = await this.adminRepository.getOneByLogin(dto.login);
        if(checkAdminExisting)
            throw new HttpException('This login is already in use.', 400);
        const hashPassword = await bcrypt.hash(dto.password!, 5);
        const id = await this.adminRepository.generateId();
        const admin = await this.adminRepository.create({...dto, id, password: hashPassword});
        const token = await this.tokenService.generateToken(admin);
        if(!token)
            throw new HttpException('Error creating token.', 400);
        await this.tokenService.saveToken(admin.id, token);
        return { token };
    }

    @Post('/login')
    async login(@Body() dto: LoginDto){
        dto = loginMapper.fromControllerToService(dto);
        const admin = await this.adminRepository.getOneByLogin(dto.login);
        if(!admin)
            throw new HttpException('Incorrect data.', 400);
        const comparePasswords = await bcrypt.compare(dto.password, admin.password);
        if(!comparePasswords)
            throw new HttpException('Incorrect data.', 400);
        const token = await this.tokenService.generateToken(admin);
        if(!token)
            throw new HttpException('Error creating token.', 400);
        await this.tokenService.saveToken(admin.id, token);
        return { token };
    }
}
