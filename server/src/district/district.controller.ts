import { Body, Controller, Delete, Get, HttpCode, HttpException, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { DistrictRepository } from './district.repository';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { createDistrictMapper } from './mappers/create-district.mapper';
import { updateDistrictMapper } from './mappers/update-district.mapper';

@Controller('district')
export class DistrictController {
    constructor(private districtRepository: DistrictRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateDistrictDto){
        dto = createDistrictMapper.fromControllerToService(dto);
        const author = await this.districtRepository.getOneByName(dto.name);
        if(author)
            throw new HttpException('This district already exists', 400);
        const id = await this.districtRepository.generateId();
        return this.districtRepository.create({...dto, id});
    }

    @Get('/:id')
    async getOneById(@Param('id') id:string){
        const author = await this.districtRepository.getOneById(id);
        if(!author)
            throw new HttpException('This district was not found', 404);
        return author;
    }

    @Get()
    async getMany(){
        return this.districtRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto: UpdateDistrictDto, @Param('id') id: string){
        dto = updateDistrictMapper.fromControllerToService(dto);
        const author = await this.districtRepository.getOneById(id);
        if(!author)
            throw new HttpException('This district was not found', 404);
        if(dto.name) {
            const nameExists = await this.districtRepository.getOneByName(dto.name);
            if(nameExists)
                throw new HttpException('This district already exists', 400);
        }
        return this.districtRepository.update(dto, author.id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id:string){
        const author = await this.districtRepository.getOneById(id);
        if(!author)
            throw new HttpException('This district was not found', 404);
        await this.districtRepository.delete(author.id);
        return { message: 'The district has been delete successfully'};
    }
}
