import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ICityServiceRequest } from './interfaces/city.service.request.interface';

@Controller('city')
export class CityController {
    constructor(@Inject('ICityServiceRequest') private readonly cityService:ICityServiceRequest){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    create(@Body() dto: CreateCityDto){
        return this.cityService.createReq(dto);
    }

    @Get('/:id')
    getOneById(@Param('id') id:string){
        return this.cityService.getOneByIdReq(id);
    }

    @Get()
    getMany(){
        return this.cityService.getManyReq();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    update(@Body() dto:UpdateCityDto, @Param('id') id:string){
        return this.cityService.updateReq(dto, id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    delete(@Param('id') id:string){
        return this.cityService.deleteReq(id);
    }
}
