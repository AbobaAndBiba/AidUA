import { Injectable } from '@nestjs/common';
import { Coordinates, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { ICoordinatesRepository } from './interfaces/coordinates.repository.interface';

@Injectable()
export class CoordinatesRepository implements ICoordinatesRepository {
    constructor(private aidUAService: AidUAService){}

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
