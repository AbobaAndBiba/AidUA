import { Injectable } from '@nestjs/common';
import { Region, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { IRegionRepository } from './interfaces/region.repository.interface';

@Injectable()
export class RegionRepository implements IRegionRepository {
    constructor(private aidUAService: AidUAService){}

    async create (dto: Prisma.RegionUncheckedCreateInput): Promise<Region>{
        return this.aidUAService.region.create({data:dto});
    }

    async getOneById (id: string): Promise<Region | null>{
        return this.aidUAService.region.findUnique({where:{id}});
    }

    async getOneByName(name: string): Promise<Region | null> {
        return this.aidUAService.region.findFirst({where:{name}});
    }
    
    async getMany (): Promise<Region[]> {
        return this.aidUAService.region.findMany();
    }

    async update (dto: Prisma.RegionUncheckedUpdateInput, id: string):Promise<Region | null>{
        return this.aidUAService.region.update({where:{id},data:dto});
    }

    async delete (id: string):Promise<Region | null>{
        return this.aidUAService.region.delete({where:{id}});
    }

    async generateId(): Promise<string>{
        let region: Region | null, id: string;
        do {
            id = v4();
            region = await this.aidUAService.region.findUnique({where: {id}});
        } while (region);
        return id;
    }
}
