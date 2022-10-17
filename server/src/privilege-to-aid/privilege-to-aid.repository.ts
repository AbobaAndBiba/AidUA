import { Injectable } from '@nestjs/common';
import { Prisma, PrivilegeToAid } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { IPrivilegeToAidRepository } from './interfaces/privilege-to-aid.service.repository';

@Injectable()
export class PrivilegeToAidRepository implements IPrivilegeToAidRepository {
    constructor(private aidUAService: AidUAService){}

    async getManyByAidId(aidId: string): Promise<PrivilegeToAid[]> {
        return this.aidUAService.privilegeToAid.findMany({where: {aidId}});
    }

    async getOneByPrivilegeIdAndAidId(privilegeId: string, aidId: string): Promise<PrivilegeToAid> {
        return this.aidUAService.privilegeToAid.findFirst({where: {privilegeId, aidId}});
    }

    async create(dto: Prisma.PrivilegeToAidUncheckedCreateInput) {
        return this.aidUAService.privilegeToAid.create({data: dto});
    }

    async delete(privilegeId: string, aidId: string): Promise<PrivilegeToAid> {
        return this.aidUAService.privilegeToAid.delete({where: {aidId_privilegeId: {privilegeId, aidId}}});
    }

    async deleteManyByAidId(aidId: string): Promise<Object> {
        return this.aidUAService.privilegeToAid.deleteMany({where: {aidId}});
    }

    async deleteManyByPrivilegeId(privilegeId: string): Promise<Object> {
        return this.aidUAService.privilegeToAid.deleteMany({where: {privilegeId}});
    }
}
