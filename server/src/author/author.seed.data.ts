import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class AuthorSeedData {
    authors: Prisma.CityUncheckedCreateInput[] = [];
    constructor(){
        for(let i = 0; i < 3; ++i)
            this.authors.push({
                id: v4(),
                name: 'author' + i
            });
    }
}

export const authorSeedData = new AuthorSeedData();