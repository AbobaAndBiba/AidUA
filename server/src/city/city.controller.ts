import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { PickupPointRepository } from 'src/pickup-point/pickup-point.repository';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { createCityMapper } from './mappers/create-city.mapper';
import { updateCityMapper } from './mappers/update-city.mapper';

@Controller('city')
export class CityController {
    constructor(private cityRepository: CityRepository,
                private pickupPointRepository: PickupPointRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateCityDto){
        dto = createCityMapper.fromControllerToService(dto);
        const checkCityExisting = await this.cityRepository.getOneByName(dto.name);
        if(checkCityExisting)
            throw new HttpException('This city already exist.', 400);
        const id = await this.cityRepository.generateId();
        const city = await this.cityRepository.create({...dto, id});
        return city;
    }

    @Get('/:id')
    async getOneById(@Param('id') id:string){
        const city = await this.cityRepository.getOneById(id);
        if(!city)
            throw new HttpException('This city was not found.', 404);
        return city;
    }

    @Get()
    async getMany(){
        return this.cityRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto: UpdateCityDto, @Param('id') id: string){
        dto = updateCityMapper.fromControllerToService(dto);
        let city = await this.cityRepository.getOneById(id);
        if(!city)
            throw new HttpException('This city was not found.', 404);
        if(dto.name){
            const checkName = await this.cityRepository.getOneByName(dto.name);
            if(checkName)
                throw new HttpException('This city already exists', 400);
            city = await this.cityRepository.update(dto, id);
        }
        return city;
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id: string){
        const city = await this.cityRepository.getOneById(id);
        if(!city)
            throw new HttpException('This city not found.', 404);
        await this.pickupPointRepository.deleteManyByCityId(city.id);
        await this.cityRepository.delete(city.id);
        return { message: 'The city has been delete successfully'};
    }
}
