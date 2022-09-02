import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { IRegionServiceRequest } from './interfaces/region.service.request.interface';

@Controller('region')
export class RegionController {
    constructor(@Inject('IRegionServiceRequest') private readonly regionService:IRegionServiceRequest){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    create(@Body() dto: CreateRegionDto){
        return this.regionService.createReq(dto);
    }

    @Get('/:id')
    getOneById(@Param('id') id:string){
        return this.regionService.getOneByIdReq(id);
    }

    @Get()
    getMany(){
        return this.regionService.getManyReq();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    update(@Body() dto:UpdateRegionDto, @Param('id') id:string){
        return this.regionService.updateReq(dto, id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    delete(@Param('id') id:string){
        return this.regionService.deleteReq(id);
    }
}
