import { Injectable } from '@nestjs/common';
import { Prisma, Privilege } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { IPrivilegeRepository } from './interfaces/privilege.repository.interface';
import { v4 } from "uuid";

@Injectable()
export class PrivilegeRepository implements IPrivilegeRepository {
    constructor(private aidUAService: AidUAService){}

    async create(dto: Prisma.PrivilegeUncheckedCreateInput): Promise<Privilege> {
        return this.aidUAService.privilege.create({data: dto});
    }

    async getOneById(id: string): Promise<Privilege> {
        return this.aidUAService.privilege.findUnique({where: {id}});
    }

    async getMany(): Promise<Privilege[]> {
        return this.aidUAService.privilege.findMany();
    }

    async update(dto: Prisma.PrivilegeUncheckedUpdateInput, id: string): Promise<Privilege> {
        return this.aidUAService.privilege.update({data: dto, where: {id}});
    }

    async delete(id: string): Promise<Privilege> {
        return this.aidUAService.privilege.delete({where: {id}});
    }

    async getOneByName(name: string): Promise<Privilege> {
        return this.aidUAService.privilege.findFirst({where: {name}});
    }

    async generateId(): Promise<string> {
        let privilege: Privilege | null, id: string;
        do {
            id = v4();
            privilege = await this.aidUAService.privilege.findUnique({where: {id}});
        } while (privilege);
        return id;
    }
}
