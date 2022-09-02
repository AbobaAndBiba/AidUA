import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { CreatePickupPointDto } from './dto/create-pickup-point.dto';
import { UpdatePickupPointDto } from './dto/update-pickup-point.dto';
import { IPickupPointServiceRequest } from './interfaces/pickup-point.request.interface';

@Controller('pickup-point')
export class PickupPointController {
    constructor(@Inject('IPickupPointService') private readonly pickupPointService:IPickupPointServiceRequest){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    create(@Body() dto: CreatePickupPointDto){
        return this.pickupPointService.createReq(dto);
    }

    @Get('/:id')
    getOneById(@Param('id') id:string){
        return this.pickupPointService.getOneByIdReq(id);
    }

    @Get()
    getMany(){
        return this.pickupPointService.getManyReq();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    update(@Body() dto:UpdatePickupPointDto, @Param('id') id:string){
        return this.pickupPointService.updateReq(dto, id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    delete(@Param('id') id:string){
        return this.pickupPointService.deleteReq(id);
    }
}
