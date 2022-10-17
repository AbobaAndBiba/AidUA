import { Injectable } from '@nestjs/common';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { INewsPagination } from './interfaces/news.pagination.interface';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService{
    constructor(private aidUAService: AidUAService,
                private newsRepository: NewsRepository){}

    async getManyFront(limit: number, offset: number): Promise<INewsPagination>{
        const total = await this.newsRepository.getTotal();
        const news = await this.newsRepository.getMany(limit, offset);
        return {
            news,
            total
        }
    }
}
