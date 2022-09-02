import { HttpException, Injectable } from '@nestjs/common';
import { City, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ICityService } from './interfaces/city.service.interface';
import { ICityServiceRequest } from './interfaces/city.service.request.interface';

@Injectable()
export class CityService implements ICityService,ICityServiceRequest {
    constructor(private aidUAService: AidUAService){}

    async createReq(dto: CreateCityDto) {
        const checkCityExisting = await this.getOneByName(dto.name);
        if(checkCityExisting)
            throw new HttpException('This city already exist.', 400);
        const id = await this.generateId();
        const city = await this.create({...dto, id});
        return city;
    }

    async getOneByIdReq(id: string) {
        const city = await this.getOneById(id);
        if(!city)
            throw new HttpException('This city was not found.', 404);
        return city;
    }

    async getManyReq() {
        return this.getMany();
    }

    async updateReq(dto: UpdateCityDto, id: string) {
        let city = await this.getOneById(id);
        if(!city)
            throw new HttpException('This city was not found.', 404);
        if(dto.name){
            const checkName = await this.getOneByName(dto.name);
            if(checkName)
                throw new HttpException('This city already exists', 400);
            city = await this.update(dto, id);
        }
        return city;
    }

    async deleteReq(id: string) {
        const city = await this.getOneById(id);
        if(!city)
            throw new HttpException('This city not found.', 404);
        await this.delete(city.id);
        return { message: 'The city has been delete successfully'};
    }

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
