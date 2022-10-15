import { Injectable } from "@nestjs/common";
import { Address, Prisma } from "prisma/generated/client";
import { AidUAService } from "src/db/aid-ua.prisma.service";
import { v4 } from "uuid";
import { IAddressRepository } from "./interfaces/address.repository.interface";

@Injectable()
export class AddressRepository implements IAddressRepository {
    constructor(private aidUAService: AidUAService){}
    
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