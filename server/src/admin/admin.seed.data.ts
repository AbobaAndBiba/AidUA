import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';
import * as bcrypt from 'bcryptjs'

class AdminSeedData {
    admins: Prisma.AdminUncheckedCreateInput[] = [];
    constructor(){
        for(let i = 0; i < 3; ++i)
            this.admins.push({
                id: v4(),
                login: 'admin' + i,
                password: bcrypt.hashSync('admin' + i)
            });
    }
}

export const adminSeedData = new AdminSeedData();