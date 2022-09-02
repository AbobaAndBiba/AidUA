import { HttpException, Injectable } from '@nestjs/common';
import { Region, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { IRegionService } from './interfaces/region.service.interface';
import { IRegionServiceRequest } from './interfaces/region.service.request.interface';

@Injectable()
export class RegionService implements IRegionService,IRegionServiceRequest {
    constructor(private aidUAService: AidUAService){}

    async createReq(dto: CreateRegionDto) {
        const checkRegionExisting = await this.getOneByName(dto.name);
        if(checkRegionExisting)
            throw new HttpException('This city already exist.', 400);
        const id = await this.generateId();
        const region = await this.create({...dto, id});
        return region;
    }

    async getOneByIdReq(id: string) {
        const region = await this.getOneById(id);
        if(!region)
            throw new HttpException('This region was not found.', 404);
        return region;
    }

    async getManyReq() {
        return this.getMany();
    }

    async updateReq(dto: UpdateRegionDto, id: string) {
        let region = await this.getOneById(id);
        if(!region)
            throw new HttpException('This region was not found.', 404);
        if(dto.name){
            const checkName = await this.getOneByName(dto.name);
            if(checkName)
                throw new HttpException('This region already exists', 400);
            region = await this.update(dto, id);
        }
        return region;
    }

    async deleteReq(id: string) {
        const region = await this.getOneById(id);
        if(!region)
            throw new HttpException('This region not found.', 404);
        await this.delete(region.id);
        return { message: 'The region has been delete successfully'};
    }

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
