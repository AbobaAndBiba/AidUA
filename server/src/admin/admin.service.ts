import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { CRUD } from "../interfaces/crud.interface"

@Injectable()
export class AdminService implements CRUD {
    constructor(private aidUAService: AidUAService){}
    
    async create(dto: Prisma.AdminUncheckedCreateInput): Promise<Admin> {
        return this.aidUAService.admin.create({data: dto});
    }

    async getOneById(id: string): Promise<Admin | null> {
        return this.aidUAService.admin.findUnique({where: {id}});
    }

    async getMany(): Promise<Admin[]> {
        return this.aidUAService.admin.findMany();
    }

    async update(dto: Prisma.AdminUncheckedUpdateInput, id: string): Promise<Admin | null> {
        return this.aidUAService.admin.update({where: {id}, data: dto});
    }

    async delete(id: string): Promise<Admin | null> {
        return this.aidUAService.admin.delete({where: {id}});
    }
}
