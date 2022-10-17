import { authorSeedData } from '../author/author.seed.data';
import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class AidSeedData {
    aids: Prisma.AidUncheckedCreateInput[] = [];
    constructor(){
        const authorDataSize = authorSeedData.authors.length;
        for(let i = 0; i < authorDataSize; ++i)
            this.aids.push({
                id: v4(),
                registration: 'registration' + i,
                phone: 'phone' + i,
                authorId: authorSeedData.authors[i].id
            });
    }
}

export const aidSeedData = new AidSeedData();