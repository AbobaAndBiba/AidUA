import { Body, Controller, Delete, Get, HttpCode, HttpException, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { PickupPointRepository } from 'src/pickup-point/pickup-point.repository';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { createRegionMapper } from './mappers/create-region.mapper';
import { updateRegionMapper } from './mappers/update-region.mapper';
import { RegionRepository } from './region.repository';

@Controller('region')
export class RegionController {
    constructor(private regionRepository: RegionRepository,
                private pickupPointRepository: PickupPointRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateRegionDto){
        dto = createRegionMapper.fromControllerToService(dto);
        const checkRegionExisting = await this.regionRepository.getOneByName(dto.name);
        if(checkRegionExisting)
            throw new HttpException('This city already exist.', 400);
        const id = await this.regionRepository.generateId();
        const region = await this.regionRepository.create({...dto, id});
        return region;
    }

    @Get('/:id')
    async getOneById(@Param('id') id:string){
        const region = await this.regionRepository.getOneById(id);
        if(!region)
            throw new HttpException('This region was not found.', 404);
        return region;
    }

    @Get()
    async getMany(){
        return this.regionRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto:UpdateRegionDto, @Param('id') id:string){
        dto = updateRegionMapper.fromControllerToService(dto);
        let region = await this.regionRepository.getOneById(id);
        if(!region)
            throw new HttpException('This region was not found.', 404);
        if(dto.name){
            const checkName = await this.regionRepository.getOneByName(dto.name);
            if(checkName)
                throw new HttpException('This region already exists', 400);
            region = await this.regionRepository.update(dto, id);
        }
        return region;
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id:string){
        const region = await this.regionRepository.getOneById(id);
        if(!region)
            throw new HttpException('This region not found.', 404);
        await this.pickupPointRepository.deleteManyByRegionId(region.id);
        await this.regionRepository.delete(region.id);
        return { message: 'The region has been delete successfully'};
    }
}
