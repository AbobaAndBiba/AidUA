import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class PrivilegeSeedData {
    privileges: Prisma.RegionUncheckedCreateInput[] = [];
    constructor(){
        for(let i = 0; i < 3; ++i)
            this.privileges.push({
                id: v4(),
                name: 'privilege' + i
            });
    }
}

export const privilegeSeedData = new PrivilegeSeedData();