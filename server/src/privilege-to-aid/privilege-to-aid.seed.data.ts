import { aidSeedData } from '../aid/aid.seed.data';
import { getMin } from '../functions/get-minimum';
import { privilegeSeedData } from '../privilege/privilege.seed.data';
import { Prisma } from '../../prisma/generated/client';

class PrivilegeToAidSeedData {
    privilegeToAids: Prisma.PrivilegeToAidUncheckedCreateInput[] = [];
    constructor(){
        const size = getMin([
            aidSeedData.aids.length,
            privilegeSeedData.privileges.length
        ]);
        for(let i = 0; i < size; ++i)
            this.privilegeToAids.push({
                aidId: aidSeedData.aids[i].id,
                privilegeId: privilegeSeedData.privileges[i].id
            });
    }
}

export const privilegeToAidSeedData = new PrivilegeToAidSeedData();