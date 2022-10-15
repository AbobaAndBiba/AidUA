import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { IMAGES_PATH } from 'src/paths/paths';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-new.dto';
import { createNewsMapper } from './mappers/create-news.mapper';
import { updateNewsMapper } from './mappers/update-news.mapper';
import { NewsRepository } from './news.repository';

@Controller('news')
export class NewsController {
    constructor(private newsRepository: NewsRepository,
                private fileUpload: FileUploadService){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @UseInterceptors(FileInterceptor('image'))
    @HttpCode(201)
    async create(@Body() dto: CreateNewsDto, @UploadedFile() image: Express.Multer.File) {
        dto = createNewsMapper.fromControllerToService(dto);
        const id = await this.newsRepository.generateId();
        if(image) {
            const imagePath = this.fileUpload.uploadFile(image, IMAGES_PATH);
            dto.image = imagePath;
        }
        return this.newsRepository.create({...dto, id});
    }

    @Get('/:id')
    async getOneById(@Param('id') id: string) {
        const news = await this.newsRepository.getOneById(id);
        if(!news)
            throw new HttpException('This news was not found', 404);
        return news;
    }

    @Get()
    async getMany(){
        return this.newsRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    @UseInterceptors(FileInterceptor('image'))
    async update(@Body() dto: UpdateNewsDto, @Param('id') id: string, @UploadedFile() image: Express.Multer.File){
        dto = updateNewsMapper.fromControllerToService(dto);
        let news = await this.newsRepository.getOneById(id);
        if(!news)
            throw new HttpException('This news was not found', 404);
        if(image) {
            if(news.image)
                this.fileUpload.deleteFile(news.image);
            const imagePath = this.fileUpload.uploadFile(image, IMAGES_PATH);
            dto.image = imagePath;
        }
        return this.newsRepository.update(dto, news.id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id: string){
        const news = await this.newsRepository.getOneById(id);
        if(!news)
            throw new HttpException('This news was not found', 404);
        if(news.image)
            this.fileUpload.deleteFile(news.image);
        await this.newsRepository.delete(news.id);
        return { message: 'The news has been delete successfully.' };
    }
}
