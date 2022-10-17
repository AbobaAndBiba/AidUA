import { Injectable } from '@nestjs/common';
import { District, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { IDistrictRepository } from './interfaces/district.repository.interface';
import { v4 } from "uuid";

@Injectable()
export class DistrictRepository implements IDistrictRepository {
    constructor(private aidUAService: AidUAService){}

    async create(dto: Prisma.DistrictUncheckedCreateInput): Promise<District> {
        return this.aidUAService.district.create({data: dto});
    }

    async getOneById(id: string): Promise<District> {
        return this.aidUAService.district.findUnique({where: {id}});
    }

    async getMany(): Promise<District[]> {
        return this.aidUAService.district.findMany();
    }

    async update(dto: Prisma.DistrictUncheckedUpdateInput, id: string): Promise<District> {
        return this.aidUAService.district.update({data: dto, where: {id}});
    }

    async delete(id: string): Promise<District> {
        return this.aidUAService.district.delete({where: {id}});
    }

    async getOneByName(name: string): Promise<District> {
        return this.aidUAService.district.findFirst({where: {name}});
    }

    async generateId(): Promise<string> {
        let district: District | null, id: string;
        do {
            id = v4();
            district = await this.aidUAService.district.findUnique({where: {id}});
        } while (district);
        return id;
    }
}
