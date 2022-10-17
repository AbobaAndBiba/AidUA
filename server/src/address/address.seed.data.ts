import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class AddressSeedData {
    addresses: Prisma.AddressUncheckedCreateInput[] = [];
    constructor(){
        for(let i = 0; i < 3; ++i)
            this.addresses.push({
                id: v4(),
                name: 'address' + i
            });
    }
}

export const addressSeedData = new AddressSeedData();