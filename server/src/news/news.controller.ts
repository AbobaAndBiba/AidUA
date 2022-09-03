import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-new.dto';
import { INewsServiceRequest } from './interfaces/news.service.request.interface';

@Controller('news')
export class NewsController {
    constructor(@Inject('INewsServiceRequest') private readonly newsService: INewsServiceRequest){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @UseInterceptors(FileInterceptor('image'))
    @HttpCode(201)
    create(@Body() dto: CreateNewsDto, @UploadedFile() image: Express.Multer.File) {
        return this.newsService.createReq(dto, image);
    }

    @Get('/:id')
    getOneById(@Param('id') id: string) {
        return this.newsService.getOneByIdReq(id);
    }

    @Get()
    getMany(){
        return this.newsService.getManyReq();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    @UseInterceptors(FileInterceptor('image'))
    update(@Body() dto: UpdateNewsDto, @Param('id') id: string, @UploadedFile() image: Express.Multer.File){
        return this.newsService.updateReq(dto, id, image);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    delete(@Param('id') id: string){
        return this.newsService.deleteReq(id);
    }
}
