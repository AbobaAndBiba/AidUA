import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class CitySeedData {
    cities: Prisma.CityUncheckedCreateInput[] = [];
    constructor(){
        for(let i = 0; i < 3; ++i)
            this.cities.push({
                id: v4(),
                name: 'city' + i
            });
    }
}

export const citySeedData = new CitySeedData();