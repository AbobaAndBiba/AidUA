import { Injectable } from '@nestjs/common';
import { Admin, Token } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private aidUAService: AidUAService,
                private jwtService: JwtService){}

    async generateToken(admin: Admin): Promise<string> {
        const payload = {
            id: admin.id,
            login: admin.login
        }
        return this.jwtService.sign(payload);
    }

    async saveToken(adminId: string, accessToken: string): Promise<Token> {
        const token = await this.aidUAService.token.findFirst({where: {adminId}});
        if(!token)
            return this.aidUAService.token.create({
                data: {
                    adminId,
                    accessToken,
                    isActive: true,
                    lastAuthorization: new Date()
                }
            });
        return this.aidUAService.token.update({
            data: { accessToken, isActive: true, lastAuthorization: new Date() },
            where: { adminId }
        });
    }

    async getOneByAdminId(adminId: string): Promise<Token | null> {
        return this.aidUAService.token.findUnique({where: {adminId}});
    }

    async getAll(): Promise<Token[]> {
        return this.aidUAService.token.findMany();
    }

    async disactivateToken(token: Token): Promise<Token> {
        return this.aidUAService.token.update({data: {isActive: false}, where: {adminId: token.adminId}});
    }
}
