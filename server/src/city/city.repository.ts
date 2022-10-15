import { Injectable } from '@nestjs/common';
import { City, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { ICityRepository } from './interfaces/city.repository.interface';

@Injectable()
export class CityRepository implements ICityRepository {
    constructor(private aidUAService: AidUAService){}

    async create(dto: Prisma.CityUncheckedCreateInput): Promise<City>{
        return this.aidUAService.city.create({data:dto});
    }

    async getOneById(id: string): Promise<City | null>{
        return this.aidUAService.city.findUnique({where: {id}});
    }

    async getOneByName(name: string): Promise<City | null> {
        return this.aidUAService.city.findFirst({where:{name}});
    }

    async getMany(): Promise<City[]>{
        return this.aidUAService.city.findMany();
    }

    async update(dto: Prisma.CityUncheckedUpdateInput, id: string):Promise<City | null>{
        return this.aidUAService.city.update({where: {id}, data:dto});
    }

    async delete(id: string):Promise<City | null>{
        return this.aidUAService.city.delete({where:{id}});
    }

    async generateId(): Promise<string>{
        let city: City | null, id: string;
        do {
            id = v4();
            city = await this.aidUAService.city.findUnique({where: {id}});
        } while (city);
        return id;
    }
}
