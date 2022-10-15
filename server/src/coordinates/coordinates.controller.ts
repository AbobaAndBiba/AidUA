import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { CoordinatesRepository } from './coordinates.repository';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';
import { UpdateCoordinatesDto } from './dto/update-coordinates.dto';
import { createCoordinatesMapper } from './mappers/create-coordinates.mapper';
import { updateCoordinatesMapper } from './mappers/update-coordinates.mapper';

@Controller('coordinates')
export class CoordinatesController {
    constructor(private coordinatesRepository: CoordinatesRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateCoordinatesDto){
        dto = createCoordinatesMapper.fromControllerToService(dto);
        const checkCoordinatesExisting = await this.coordinatesRepository.getOneByValues(dto.x,dto.y);
        if(checkCoordinatesExisting)
            throw new HttpException('This coordinates already exist.', 400);
        const id = await this.coordinatesRepository.generateId();
        const coordinates = await this.coordinatesRepository.create({...dto, id});
        return coordinates;
    }

    @Get('/:id')
    async getOneById(@Param('id') id:string){
        const coordinates = await this.coordinatesRepository.getOneById(id);
        if(!coordinates)
            throw new HttpException('This coordinates was not found.', 404);
        return coordinates;
    }

    @Get()
    async getMany(){
        return this.coordinatesRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto:UpdateCoordinatesDto, @Param('id') id:string){
        dto = updateCoordinatesMapper.fromControllerToService(dto);
        let coordinates = await this.coordinatesRepository.getOneById(id);
        if(!coordinates)
            throw new HttpException('This coordinates was not found.', 404);
        if(dto.x || dto.y){
            const checkValues = await this.coordinatesRepository.getOneByValues(dto.x ? dto.x : coordinates.x,dto.y ? dto.y : coordinates.y);
            if(checkValues)
                throw new HttpException('This coordinates already exists', 400);
            coordinates = await this.coordinatesRepository.update(dto, id);
        }
        return coordinates;
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id:string){
        const coordinates = await this.coordinatesRepository.getOneById(id);
        if(!coordinates)
            throw new HttpException('This coordinates not found.', 404);
        await this.coordinatesRepository.delete(coordinates.id);
        return { message:'The coordinates has been delete successfully' };
    }
}
