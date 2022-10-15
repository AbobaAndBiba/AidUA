import {Injectable } from '@nestjs/common';
import { Aid, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { IAidRepository } from './interfaces/aid.repository.interface';
import { v4 } from "uuid";

@Injectable()
export class AidRepository implements IAidRepository {
    constructor(private aidUAService: AidUAService){}

    async create(dto: Prisma.AidUncheckedCreateInput): Promise<Aid> {
        return this.aidUAService.aid.create({data: dto});
    }

    async getOneById(id: string): Promise<Aid | null> {
        return this.aidUAService.aid.findUnique({where: {id}});
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
