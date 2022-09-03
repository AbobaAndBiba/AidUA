import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { CreateCityAddressDto } from './dto/create-city-address.dto';
import { UpdateCityAddressDto } from './dto/update-city-address.dto';
import { ICityAddressServiceRequest } from './interfaces/city-address.service.request.interface';

@Controller('city-address')
export class CityAddressController {
    constructor(@Inject('ICityAddressServiceRequest') private readonly cityAddressService:ICityAddressServiceRequest){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    create(@Body() dto: CreateCityAddressDto){
        return this.cityAddressService.createReq(dto);
    }

    @Get('/:id')
    getOneById(@Param('id') id:string){
        return this.cityAddressService.getOneByIdReq(id);
    }

    @Get()
    getMany(){
        return this.cityAddressService.getManyReq();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    update(@Body() dto:UpdateCityAddressDto, @Param('id') id:string){
        return this.cityAddressService.updateReq(dto, id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    delete(@Param('id') id:string){
        return this.cityAddressService.deleteReq(id);
    }
}
