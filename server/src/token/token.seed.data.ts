import { Prisma } from '../../prisma/generated/client';
import { adminSeedData } from '../admin/admin.seed.data';

class TokenSeedData {
    tokens: Prisma.TokenUncheckedCreateInput[] = [];
    constructor(){
        const adminDataSize = adminSeedData.admins.length;
        for(let i = 0; i < adminDataSize; ++i)
            this.tokens.push({
                adminId: adminSeedData.admins[i].id,
                accessToken: 'accessToken' + i,
                isActive: true
            });
    }
}

export const tokenSeedData = new TokenSeedData();