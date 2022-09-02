import { HttpException, Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { RegistrationDto } from './dto/registration.dto';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/token/token.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(private adminService: AdminService,
                private tokenService: TokenService){}

    async registration(dto: RegistrationDto) {
        const checkAdminExisting = await this.adminService.getOneByLogin(dto.login);
        if(checkAdminExisting)
            throw new HttpException('This login is already in use.', 400);
        const hashPassword = await bcrypt.hash(dto.password!, 5);
        const id = await this.adminService.generateId();
        const admin = await this.adminService.create({...dto, id, password: hashPassword});
        const token = await this.tokenService.generateToken(admin);
        if(!token)
            throw new HttpException('Error creating token.', 400);
        await this.tokenService.saveToken(admin.id, token);
        return { token };
    }

    async login(dto: LoginDto) {
        const admin = await this.adminService.getOneByLogin(dto.login);
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

    async auth(req: Request) {
        const adminReq = req.admin;
        const admin = await this.adminService.getOneById(adminReq.id);
        if(!admin)
            throw new HttpException('The admin was not found.', 404);
        const token = await this.tokenService.generateToken(admin);
        if(!token)
            throw new HttpException('Error creating token.', 400);
        await this.tokenService.saveToken(admin.id, token);
        return { token };
    }

    async logout(req: Request){
        const adminReq = req.admin;
        const admin = await this.adminService.getOneById(adminReq.id);
        if(!admin)
            throw new HttpException('The admin was not found.', 404);
        const token = await this.tokenService.getOneByAdminId(admin.id);
        if(!token)
            throw new HttpException('The token was not found.', 404);
        await this.tokenService.disactivateToken(token);
        return { message: 'Logout has been executed successfully.' };
    }
}
