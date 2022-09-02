import { HttpException, Injectable } from '@nestjs/common';
import { Aid, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { CreateAidDto } from './dto/create-aid.dto';
import { UpdateAidDto } from './dto/update-aid.dto';
import { IAidService } from './interfaces/aid.service.interface';
import { IAidServiceRequest } from './interfaces/aid.service.request.interface';

@Injectable()
export class AidService implements IAidService, IAidServiceRequest {
    constructor(private aidUAService: AidUAService){}

    async createReq(dto: CreateAidDto) {
        const checkAidExisting = await this.getOneByName(dto.name);
        if(checkAidExisting)
            throw new HttpException('This aid already exists.', 400);
        const id = await this.generateId();
        const aid = await this.create({...dto, id});
        return aid;
    }

    async getOneByIdReq(id: string) {
        const aid = await this.getOneById(id);
        if(!aid)
            throw new HttpException('This aid was not found.', 404);
        return aid ;
    }

    async getManyReq() {
        return this.getMany();
    }

    async updateReq(dto: UpdateAidDto, id: string) {
        let aid = await this.getOneById(id);
        if(!aid)
            throw new HttpException('This aid was not found.', 404);
        if(dto.name){
            const checkName = await this.getOneByName(dto.name);
            if(checkName)
                throw new HttpException('This aid already exists.', 400);
            aid = await this.update(dto, id);
        }
        return aid;
    }

    async deleteReq(id: string) {
        const aid = await this.getOneById(id);
        if(!aid)
            throw new HttpException('This aid was not found.', 404);
        await this.delete(aid.id);
        return { message: 'The aid has been delete successfully.' };
    }

    async create(dto: Prisma.AidUncheckedCreateInput): Promise<Aid> {
        return this.aidUAService.aid.create({data: dto});
    }

    async getOneById(id: string): Promise<Aid | null> {
        return this.aidUAService.aid.findUnique({where: {id}});
    }

    async getOneByName(name: string): Promise<Aid | null> {
        return this.aidUAService.aid.findFirst({where: {name}});
    }

    async getMany(): Promise<Aid[]> {
        return this.aidUAService.aid.findMany();
    }
    
    async update(dto: Object, id: string): Promise<Aid | null> {
        return this.aidUAService.aid.update({where: {id}, data: dto});
    }

    async delete(id: string): Promise<Aid | null> {
        return this.aidUAService.aid.delete({where: {id}});
    }

    async generateId(): Promise<string> {
        let aid: Aid | null, id: string;
        do {
            id = v4();
            aid = await this.aidUAService.aid.findUnique({where: {id}});
        } while (aid);
        return id;
    }
}
