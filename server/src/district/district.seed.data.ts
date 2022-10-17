import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class DistrictSeedData {
    districts: Prisma.DistrictUncheckedCreateInput[] = [];
    constructor(){
        for(let i = 0; i < 3; ++i)
            this.districts.push({
                id: v4(),
                name: 'district' + i
            });
    }
}

export const districtSeedData = new DistrictSeedData();