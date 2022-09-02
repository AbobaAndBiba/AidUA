import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';
import { UpdateCoordinatesDto } from './dto/update-coordinates.dto';
import { ICoordinatesServiceRequest } from './interfaces/coordinates.service.request.interface';

@Controller('coordinates')
export class CoordinatesController {
    constructor(@Inject('ICoordinatesServiceRequest') private readonly coordinatesService:ICoordinatesServiceRequest){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    create(@Body() dto: CreateCoordinatesDto){
        return this.coordinatesService.createReq(dto);
    }

    @Get('/:id')
    getOneById(@Param('id') id:string){
        return this.coordinatesService.getOneByIdReq(id);
    }

    @Get()
    getMany(){
        return this.coordinatesService.getManyReq();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    update(@Body() dto:UpdateCoordinatesDto, @Param('id') id:string){
        return this.coordinatesService.updateReq(dto, id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    delete(@Param('id') id:string){
        return this.coordinatesService.deleteReq(id);
    }
}
