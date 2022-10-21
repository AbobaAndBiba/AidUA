import { Injectable } from '@nestjs/common';
import { Token } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { ITokenRpository } from './interfaces/token.repository.interface';

@Injectable()
export class TokenRepository implements ITokenRpository {
    constructor(private aidUAService: AidUAService){}

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
