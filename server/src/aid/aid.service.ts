import { Injectable } from '@nestjs/common';
import { Privilege } from 'prisma/generated/client';
import { PrivilegeToAidRepository } from 'src/privilege-to-aid/privilege-to-aid.repository';
import { PrivilegeRepository } from 'src/privilege/privilege.repository';
import { IAidService } from './interfaces/aid.service.interface';

@Injectable()
export class AidService implements IAidService {
    constructor(private privilegeRepository: PrivilegeRepository,
                private privilegeToAidRepository: PrivilegeToAidRepository){}

    async addPrivileges(privileges: string[], aidId: string): Promise<Privilege[]> {
        const res: Privilege[] = [];
        for(const privilegeName of privileges){
            const privilege = await this.privilegeRepository.getOneByName(privilegeName);
            if(!privilege)
                continue;
            const privilegeToAid = await this.privilegeToAidRepository.getOneByPrivilegeIdAndAidId(privilege.id, aidId);
            if(privilegeToAid)
                continue;
            await this.privilegeToAidRepository.create({
                aidId,
                privilegeId: privilege.id
            });
            res.push(privilege);
        }
        return res;
    }

    async removePrivileges(privileges: string[], aidId: string): Promise<Privilege[]> {
        const res: Privilege[] = [];
        for(const privilegeName of privileges){
            const privilege = await this.privilegeRepository.getOneByName(privilegeName);
            if(!privilege)
                continue;
            const privilegeToAid = await this.privilegeToAidRepository.getOneByPrivilegeIdAndAidId(privilege.id, aidId);
            if(!privilegeToAid)
                continue;
            await this.privilegeToAidRepository.delete(privilege.id, aidId);
            res.push(privilege);
        }
        return res;
    }
}
