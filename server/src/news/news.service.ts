import { HttpException, Injectable } from '@nestjs/common';
import { News, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-new.dto';
import { INewsService } from './interfaces/news.service.interface';
import { INewsServiceRequest } from './interfaces/news.service.request.interface';
import { v4 } from "uuid";
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { IMAGES_PATH } from 'src/paths/paths';

@Injectable()
export class NewsService implements INewsService, INewsServiceRequest {
    constructor(private aidUAService: AidUAService,
                private fileUpload: FileUploadService){}

    async createReq(dto: CreateNewsDto, image: Express.Multer.File | null = null) {
        const id = await this.generateId();
        if(image) {
            const imagePath = this.fileUpload.uploadFile(image, IMAGES_PATH);
            dto.image = imagePath;
        }
        return this.create({...dto, id});
    }

    async getOneByIdReq(id: string) {
        const news = await this.getOneById(id);
        if(!news)
            throw new HttpException('This news was not found', 404);
        return news;
    }

    async getManyReq() {
        return this.getMany();
    }
    
    async updateReq(dto: UpdateNewsDto, id: string, image: Express.Multer.File | null = null) {
        let news = await this.getOneById(id);
        if(!news)
            throw new HttpException('This news was not found', 404);
        if(image) {
            if(news.image)
                this.fileUpload.deleteFile(news.image);
            const imagePath = this.fileUpload.uploadFile(image, IMAGES_PATH);
            dto.image = imagePath;
        }
        return this.update(dto, news.id);
    }
    
    async deleteReq(id: string) {
        const news = await this.getOneById(id);
        if(!news)
            throw new HttpException('This news was not found', 404);
        if(news.image)
            this.fileUpload.deleteFile(news.image);
        await this.delete(news.id);
        return { message: 'The news has been delete successfully.' };
    }

    async create(dto: Prisma.NewsUncheckedCreateInput): Promise<News> {
        return this.aidUAService.news.create({data: dto});
    }

    async getOneById(id: string): Promise<News | null> {
        return this.aidUAService.news.findUnique({where: {id}});
    }

    async getMany(): Promise<News[]> {
        return this.aidUAService.news.findMany();
    }

    async getByDate(date: Date): Promise<News[]> {
        return this.aidUAService.news.findMany({where: {createdAt: date}});
    }

    async update(dto: Object, id: string): Promise<News | null> {
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
