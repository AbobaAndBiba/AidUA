import { HttpException, Injectable } from '@nestjs/common';
import { Coordinates, Prisma } from 'prisma/generated/client';
import { ICityService } from 'src/city/interfaces/city.service.interface';
import { ICityServiceRequest } from 'src/city/interfaces/city.service.request.interface';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';
import { UpdateCoordinatesDto } from './dto/update-coordinates.dto';
import { ICoordinatesService } from './interfaces/coordinates.service.interface';
import { ICoordinatesServiceRequest } from './interfaces/coordinates.service.request.interface';

@Injectable()
export class CoordinatesService implements ICoordinatesService, ICoordinatesServiceRequest {
    constructor(private aidUAService: AidUAService){}

    async createReq(dto:CreateCoordinatesDto){
        const checkCoordinatesExisting = await this.getOneByValues(dto.x,dto.y);
        if(checkCoordinatesExisting)
            throw new HttpException('This coordinates already exist.', 400);
        const id = await this.generateId();
        const coordinates = await this.create({...dto, id});
        return coordinates;
    }

    async getOneByIdReq(id: string) {
        const coordinates = await this.getOneById(id);
        if(!coordinates)
            throw new HttpException('This coordinates was not found.', 404);
        return coordinates;
    }

    async getManyReq() {
        return this.getMany();
    }

    async updateReq(dto: UpdateCoordinatesDto, id: string) {
        let coordinates = await this.getOneById(id);
        if(!coordinates)
            throw new HttpException('This coordinates was not found.', 404);
        if(dto.x || dto.y){
            const checkValues = await this.getOneByValues(dto.x ? dto.x : coordinates.x,dto.y ? dto.y : coordinates.y);
            if(checkValues)
                throw new HttpException('This coordinates already exists', 400);
            coordinates = await this.update(dto, id);
        }
        return coordinates;
    }

    async deleteReq(id: string) {
        const coordinates = await this.getOneById(id);
        if(!coordinates)
            throw new HttpException('This coordinates not found.', 404);
        await this.delete(coordinates.id);
        return { message:'The coordinates has been delete successfully' };
    }

    async create(dto: Prisma.CoordinatesUncheckedCreateInput): Promise<Coordinates>{
        return this.aidUAService.coordinates.create({data:dto});
    }

    async getOneById(id: string): Promise<Coordinates | null>{
        return this.aidUAService.coordinates.findUnique({where:{id}});
    }

    async getOneByValues(x: number, y: number){
        return this.aidUAService.coordinates.findFirst({where: {x, y}});
    }

    async getMany(): Promise<Coordinates[]>{
        return this.aidUAService.coordinates.findMany()
    }
    
    async update(dto: Prisma.CoordinatesUncheckedUpdateInput, id: string): Promise<Coordinates | null>{
        return this.aidUAService.coordinates.update({where: {id}, data: dto});
    }

    async delete(id: string):Promise<Coordinates | null>{
        return this.aidUAService.coordinates.delete({where: {id}});
    }

    async generateId(): Promise<string>{
        let coordinates: Coordinates | null, id: string;
        do {
            id = v4();
            coordinates = await this.aidUAService.coordinates.findUnique({where: {id}});
        } while (coordinates);
        return id;
    }
}
