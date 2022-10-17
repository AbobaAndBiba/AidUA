import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class NewsSeedData {
    news: Prisma.NewsUncheckedCreateInput[] = [];
    constructor(){
        for(let i = 0; i < 5; ++i)
            this.news.push({
                id: v4(),
                title: 'title' + i,
                text: 'text' + i,
                link: 'https://www.google.com/'
            });
    }
}

export const newsSeedData = new NewsSeedData();