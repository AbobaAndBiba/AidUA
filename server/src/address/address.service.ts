import { HttpException, Injectable } from '@nestjs/common';
import { Address, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { IAddressService } from './interfaces/address.service.interface';
import { IAddressServiceRequest } from './interfaces/address.service.request.interface';

@Injectable()
export class AddressService implements IAddressService, IAddressServiceRequest {
    constructor(private aidUAService: AidUAService){}

    async createReq(dto: CreateAddressDto) {
        const checkAddressExisting = await this.getOneByName(dto.name);
        if(checkAddressExisting)
            throw new HttpException('This address already exist.', 400);
        const id = await this.generateId();
        const address = await this.create({...dto, id});
        return address;
    }

    async getOneByIdReq(id: string) {
        const address = await this.getOneById(id);
        if(!address)
            throw new HttpException('This address was not found.', 404);
        return address;
    }

    async getManyReq() {
        return this.getMany();
    }

    async updateReq(dto: UpdateAddressDto, id: string) {
        let address = await this.getOneById(id);
        if(!address)
            throw new HttpException('This address was not found.', 404);
        if(dto.name){
            const checkName = await this.getOneByName(dto.name);
            if(checkName)
                throw new HttpException('This address already exists', 400);
            address = await this.update(dto, id);
        }
        return address;
    }

    async deleteReq(id: string) {
        const address = await this.getOneById(id);
        if(!address)
            throw new HttpException('This address not found.', 404);
        await this.delete(address.id);
        return { message:'The address has been delete successfully' };
    }

    async create(dto: Prisma.AddressUncheckedCreateInput): Promise<Address>{
        return this.aidUAService.address.create({data:dto});
    }

    async getOneById(id: string): Promise<Address | null> {
        return this.aidUAService.address.findUnique({where: {id}});
    }

    async getOneByName(name: string): Promise<Address | null> {
        return this.aidUAService.address.findFirst({where: {name}});
    }

    async getMany(): Promise<Address[]> {
        return this.aidUAService.address.findMany();
    }

    async update(dto: Prisma.AddressUncheckedUpdateInput, id: string): Promise<Address | null> {
        return this.aidUAService.address.update({where: {id}, data: dto});
    }

    async delete(id: string): Promise<Address | null> {
        return this.aidUAService.address.delete({where: {id}});
    }

    async generateId(): Promise<string>{
        let address: Address | null, id: string;
        do {
            id = v4();
            address = await this.aidUAService.address.findUnique({where: {id}});
        } while (address);
        return id;
    }
}
