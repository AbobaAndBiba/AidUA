import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AddressRepository } from 'src/address/address.repository';
import { AidRepository } from 'src/aid/aid.repository';
import { CityRepository } from 'src/city/city.repository';
import { CoordinatesRepository } from 'src/coordinates/coordinates.repository';
import { DistrictRepository } from 'src/district/district.repository';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { RegionRepository } from 'src/region/region.repository';
import { CreatePickupPointDto } from './dto/create-pickup-point.dto';
import { GetPickupPointsFrontDto } from './dto/get-pickup-points-front.dto';
import { UpdatePickupPointDto } from './dto/update-pickup-point.dto';
import { createPickupPointMapper } from './mappers/create-pickup-point.mapper';
import { getPickupPointsFrontMapper } from './mappers/get-pickup-points-front.mapper';
import { updatePickupPointMapper } from './mappers/update-pickup-point.mapper';
import { PickupPointRepository } from './pickup-point.repository';
import { PickupPointService } from './pickup-point.service';

@Controller('pickup-point')
export class PickupPointController {
    constructor(private pickupPointRepository: PickupPointRepository,
                private pickupPointService: PickupPointService,
                private cityRepository: CityRepository,
                private regionRepository: RegionRepository,
                private districtRepository: DistrictRepository,
                private addressRepository: AddressRepository,
                private coordinatesRepository: CoordinatesRepository,
                private aidRepository: AidRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreatePickupPointDto){
        dto = createPickupPointMapper.fromControllerToService(dto);
        const checkPickupPointExisting = await this.pickupPointRepository.getOneByName(dto.name);
        if(checkPickupPointExisting)
            throw new HttpException('This pickup point already exist.', 400);
        const city = await this.cityRepository.getOneById(dto.cityId);
        if(!city)
            throw new HttpException('This city was not found.', 404);
        const region = await this.regionRepository.getOneById(dto.regionId);
        if(!region)
            throw new HttpException('This region was not found.', 404);
        const district = await this.districtRepository.getOneById(dto.districtId);
        if(!district)
            throw new HttpException('This district was not found.', 404);
        const address = await this.addressRepository.getOneById(dto.addressId);
        if(!address)
            throw new HttpException('This address was not found.', 404);
        const coordinates = await this.coordinatesRepository.getOneById(dto.coordinatesId);
        if(!coordinates)
            throw new HttpException('This coordinates was not found.', 404);
        const aid = await this.aidRepository.getOneById(dto.aidId);
        if(!aid)
            throw new HttpException('This aid was not found.', 404);
        const id = await this.pickupPointRepository.generateId();
        return this.pickupPointRepository.create({
            ...dto, 
            id, 
            aidId: aid.id, 
            cityId: city.id,
            regionId: region.id,
            districtId: district.id,
            addressId: address.id,
            coordinatesId: coordinates.id
        });
    }

    @Post('/all')
    async getManyFront(@Body() filter: GetPickupPointsFrontDto) {
        filter = getPickupPointsFrontMapper.fromFrontToController(filter);
        return this.pickupPointService.getManyFront(filter);
    }

    @Get('/:id')
    async getOneById(@Param('id') id: string){
        const pickupPoint = await this.pickupPointRepository.getOneById(id);
        if(!pickupPoint)
            throw new HttpException('This pickup point was not found.', 404);
        return pickupPoint;
    }

    @Get()
    async getMany(){
        return this.pickupPointRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto:UpdatePickupPointDto, @Param('id') id:string){
        dto = updatePickupPointMapper.fromControllerToService(dto);
        const pickupPoint = await this.pickupPointRepository.getOneById(id);
        if(!pickupPoint)
            throw new HttpException('This pickup point was not found.', 404);
        if(dto.cityId){
            const city = await this.cityRepository.getOneById(dto.cityId);
            if(!city)
                delete dto.cityId;
        }
        if(dto.regionId) {
            const region = await this.regionRepository.getOneById(dto.regionId);
            if(!region)
                delete dto.regionId;
        }
        if(dto.districtId) {
            const district = await this.districtRepository.getOneById(dto.districtId);
            if(!district)
                delete dto.districtId;
        }
        if(dto.addressId) { 
            const address = await this.addressRepository.getOneById(dto.districtId);
            if(!address)
                delete dto.addressId;
        }
        if(dto.coordinatesId) {
            const coordinates = await this.coordinatesRepository.getOneById(dto.coordinatesId);
            if(!coordinates)
                delete dto.coordinatesId;
        }
        if(dto.aidId) {
            const aid = await this.aidRepository.getOneById(dto.aidId);
            if(!aid)
                delete dto.aidId;
        }
        return this.pickupPointRepository.update(dto, id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id:string){
        const pickupPoint = await this.pickupPointRepository.getOneById(id);
        if(!pickupPoint)
            throw new HttpException('This pickup point not found.', 404);
        await this.pickupPointRepository.delete(pickupPoint.id);
        return { message: 'The pickup point has been delete successfully'};
    }
}
