import { Injectable } from '@nestjs/common';
import { AidRepository } from 'src/aid/aid.repository';
import { PickupPointRepository } from 'src/pickup-point/pickup-point.repository';
import { PrivilegeToAidRepository } from 'src/privilege-to-aid/privilege-to-aid.repository';

@Injectable()
export class AuthorService {
    constructor(private aidRepository: AidRepository,
                private privilegeToAidRepository: PrivilegeToAidRepository,
                private pickupPointRepository: PickupPointRepository){}

    async deleteManyPrivilegeToAidsByAuthorId(authorId: string){
        const aids = await this.aidRepository.getManyByAuthorId(authorId);
        for(const aid of aids)
            await this.privilegeToAidRepository.deleteManyByAidId(aid.id);
    }

    async deleteManyPickupPointsByAuthorId(authorId: string) {
        const aids = await this.aidRepository.getManyByAuthorId(authorId);
        for(const aid of aids)
            await this.pickupPointRepository.deleteManyByAidId(aid.id);
    }
}
