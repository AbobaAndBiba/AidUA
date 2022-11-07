import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { ParamToNumberPipe } from 'src/pipes/param-to-number.pipe';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-new.dto';
import { createNewsMapper } from './mappers/create-news.mapper';
import { updateNewsMapper } from './mappers/update-news.mapper';
import { NewsRepository } from './news.repository';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private newsRepository: NewsRepository,
                private newsService: NewsService){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateNewsDto) {
        dto = createNewsMapper.fromControllerToService(dto);
        const id = await this.newsRepository.generateId();
        return this.newsRepository.create({...dto, id});
    }

    @Get('/all/:limit/:offset')
    async getManyFront(@Param('limit', ParamToNumberPipe) limit: number, @Param('offset', ParamToNumberPipe) offset: number){
        return this.newsService.getManyFront(limit, offset);
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
    async update(@Body() dto: UpdateNewsDto, @Param('id') id: string){
        dto = updateNewsMapper.fromControllerToService(dto);
        const news = await this.newsRepository.getOneById(id);
        if(!news)
            throw new HttpException('This news was not found', 404);
        return this.newsRepository.update(dto, news.id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id: string){
        const news = await this.newsRepository.getOneById(id);
        if(!news)
            throw new HttpException('This news was not found', 404);
        await this.newsRepository.delete(news.id);
        return { message: 'The news has been delete successfully.' };
    }
}
