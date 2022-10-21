import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AidRepository } from 'src/aid/aid.repository';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { createAuthorMapper } from './mappers/create-author.mapper';
import { updateAuthorMapper } from './mappers/update-author.mapper';

@Controller('author')
export class AuthorController {
    constructor(private authorRepository: AuthorRepository,
                private authorService: AuthorService,
                private aidRepository: AidRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateAuthorDto) {
        dto = createAuthorMapper.fromControllerToService(dto);
        const author = await this.authorRepository.getOneByName(dto.name);
        if(author)
            throw new HttpException('This author already exists', 400);
        const id = await this.authorRepository.generateId();
        return this.authorRepository.create({...dto, id});
    }

    @Get('/:id')
    @UseGuards(IsLogedInGuard)
    async getOneById(@Param('id') id: string) {
        const author = await this.authorRepository.getOneById(id);
        if(!author)
            throw new HttpException('This author was not found', 404);
        return author;
    }

    @Get()
    @UseGuards(IsLogedInGuard)
    async getMany(){
        return this.authorRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto: UpdateAuthorDto, @Param('id') id: string) {
        dto = updateAuthorMapper.fromControllerToService(dto);
        const author = await this.authorRepository.getOneById(id);
        if(!author)
            throw new HttpException('This author was not found', 404);
        if(dto.name) {
            const nameExists = await this.authorRepository.getOneByName(dto.name);
            if(nameExists)
                throw new HttpException('This author already exists', 400);
        }
        return this.authorRepository.update(dto, author.id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id: string) {
        const author = await this.authorRepository.getOneById(id);
        if(!author)
            throw new HttpException('This author was not found', 404);
        await this.authorService.deleteManyPrivilegeToAidsByAuthorId(author.id);
        await this.authorService.deleteManyPickupPointsByAuthorId(author.id);
        await this.aidRepository.deleteManyByAuthorId(author.id);
        await this.authorRepository.delete(author.id);
        return { message: 'The author has been delete successfully'};
    }
}
