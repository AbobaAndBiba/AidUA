import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { IAddressServiceRequest } from './interfaces/address.service.request.interface';

@Controller('address')
export class AddressController {
    constructor(@Inject('IAddressServiceRequest') private readonly addressService: IAddressServiceRequest){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    create(@Body() dto: CreateAddressDto){
        return this.addressService.createReq(dto);
    }

    @Get('/:id')
    getOneById(@Param('id') id:string){
        return this.addressService.getOneByIdReq(id);
    }

    @Get()
    getMany(){
        return this.addressService.getManyReq();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    update(@Body() dto:UpdateAddressDto, @Param('id') id: string){
        return this.addressService.updateReq(dto, id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    delete(@Param('id') id:string){
        return this.addressService.deleteReq(id);
    }
}
