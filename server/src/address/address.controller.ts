import { Body, Controller, Delete, Get, HttpCode, HttpException, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { createAddressMapper } from './mappers/create-address.mapper';
import { updateAddressMapper } from './mappers/update-address.mapper';

@Controller('address')
export class AddressController {
    constructor( private addressRepository: AddressRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateAddressDto){
        dto = createAddressMapper.fromFrontToController(dto);
        const checkAddressExisting = await this.addressRepository.getOneByName(dto.name);
        if(checkAddressExisting)
            throw new HttpException('This address already exists.', 400);
        const id = await this.addressRepository.generateId();
        return await this.addressRepository.create({...dto, id});
    }

    @Get('/:id')
    async getOneById(@Param('id') id: string){
        const address = await this.addressRepository.getOneById(id);
        if(!address)
            throw new HttpException('This address was not found.', 404);
        return address;
    }

    @Get()
    async getMany(){
        return this.addressRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto: UpdateAddressDto, @Param('id') id: string){
        dto = updateAddressMapper.fromFrontToController(dto);
        let address = await this.addressRepository.getOneById(id);
        if(!address)
            throw new HttpException('This address was not found.', 404);
        if(dto.name){
            const checkName = await this.addressRepository.getOneByName(dto.name);
            if(checkName)
                throw new HttpException('This address already exists', 400);
            address = await this.addressRepository.update(dto, id);
        }
        return address;
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id:string){
        const address = await this.addressRepository.getOneById(id);
        if(!address)
            throw new HttpException('This address not found.', 404);
        await this.addressRepository.delete(address.id);
        return { message:'The address has been delete successfully' };
    }
}
