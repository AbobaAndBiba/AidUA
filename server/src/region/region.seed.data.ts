import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class RegionSeedData {
    regions: Prisma.RegionUncheckedCreateInput[] = [];
    constructor(){
        for(let i = 0; i < 3; ++i)
            this.regions.push({
                id: v4(),
                name: 'region' + i
            });
    }
}

export const regionSeedData = new RegionSeedData();