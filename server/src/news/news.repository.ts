import { Injectable } from '@nestjs/common';
import { News, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { INewsRepository } from './interfaces/news.repository.interface';
import { v4 } from "uuid";
import { isNumber } from 'class-validator';

@Injectable()
export class NewsRepository implements INewsRepository {
    constructor(private aidUAService: AidUAService){}

    async create(dto: Prisma.NewsUncheckedCreateInput): Promise<News> {
        return this.aidUAService.news.create({data: dto});
    }

    async getOneById(id: string): Promise<News | null> {
        return this.aidUAService.news.findUnique({where: {id}});
    }

    async getTotal(): Promise<number> {
        return (await this.aidUAService.news.aggregate({
            _count: true
        }))._count;
    }

    async getMany(limit?: number, offset?: number): Promise<News[]> {
        if(isNumber(limit) && isNumber(offset))
            return this.aidUAService.news.findMany({
                orderBy: {createdAt: 'desc'},
                skip: offset, take: limit
            });
        return this.aidUAService.news.findMany({orderBy: {createdAt: 'desc'}});
    }

    async getByDate(date: Date): Promise<News[]> {
        return this.aidUAService.news.findMany({where: {createdAt: date}});
    }

    async update(dto: Prisma.NewsUncheckedUpdateInput, id: string): Promise<News | null> {
        return this.aidUAService.news.update({where: {id}, data: dto});
    }

    async delete(id: string): Promise<News | null> {
        return this.aidUAService.news.delete({where: {id}});
    }

    async generateId(): Promise<string> {
        let news: News | null, id: string;
        do {
            id = v4();
            news = await this.aidUAService.news.findUnique({where: {id}});
        } while (news);
        return id;
    }
}
