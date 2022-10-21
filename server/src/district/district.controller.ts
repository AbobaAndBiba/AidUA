import { Body, Controller, Delete, Get, HttpCode, HttpException, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { PickupPointRepository } from 'src/pickup-point/pickup-point.repository';
import { DistrictRepository } from './district.repository';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { createDistrictMapper } from './mappers/create-district.mapper';
import { updateDistrictMapper } from './mappers/update-district.mapper';

@Controller('district')
export class DistrictController {
    constructor(private districtRepository: DistrictRepository,
                private pickupPointRepository: PickupPointRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateDistrictDto){
        dto = createDistrictMapper.fromControllerToService(dto);
        const district = await this.districtRepository.getOneByName(dto.name);
        if(district)
            throw new HttpException('This district already exists', 400);
        const id = await this.districtRepository.generateId();
        return this.districtRepository.create({...dto, id});
    }

    @Get('/:id')
    async getOneById(@Param('id') id:string){
        const district = await this.districtRepository.getOneById(id);
        if(!district)
            throw new HttpException('This district was not found', 404);
        return district;
    }

    @Get()
    async getMany(){
        return this.districtRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto: UpdateDistrictDto, @Param('id') id: string){
        dto = updateDistrictMapper.fromControllerToService(dto);
        const district = await this.districtRepository.getOneById(id);
        if(!district)
            throw new HttpException('This district was not found', 404);
        if(dto.name) {
            const nameExists = await this.districtRepository.getOneByName(dto.name);
            if(nameExists)
                throw new HttpException('This district already exists', 400);
        }
        return this.districtRepository.update(dto, district.id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id:string){
        const district = await this.districtRepository.getOneById(id);
        if(!district)
            throw new HttpException('This district was not found', 404);
        await this.pickupPointRepository.deleteManyByDistrictId(district.id);
        await this.districtRepository.delete(district.id);
        return { message: 'The district has been delete successfully'};
    }
}
