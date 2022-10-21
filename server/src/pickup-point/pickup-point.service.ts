import { Injectable } from '@nestjs/common';
import { GetPickupPointsFrontDto } from './dto/get-pickup-points-front.dto';
import { PickupPointRepository } from './pickup-point.repository';

@Injectable()
export class PickupPointService  {
    constructor(private pickupPointRepository: PickupPointRepository){}

    async getManyFront(filters?: GetPickupPointsFrontDto)  {
        if(filters.where) {
            const filter = this.createFilter(filters);
            return this.pickupPointRepository.getManyFront(filter);
        }
        return this.pickupPointRepository.getManyFront();
    }

    createFilter(dto: GetPickupPointsFrontDto) {
        let res = {};
        for(const obj of dto.where) {
            const OR = [];
            for(const item of obj.value) {
                if(obj.label === 'author'){
                    OR.push({
                        name: item
                    });
                    continue;
                }
                if(obj.label === 'privileges') {
                    OR.push({
                        privilege: {
                            name: item
                        }
                    });
                    continue;
                }
                OR.push({
                    name: item
                });
            }
            if(obj.label === 'privileges') {
                res['aid'] = {
                    [obj.label]: {
                        some: {
                            OR
                        }
                    }
                };
                continue;
            }
            if(obj.label === 'author') {
                res['aid'] = {
                    [obj.label]: {
                        OR
                    }
                };
                continue;
            }
            res[obj.label] = {
                OR
            };
        }
        return res;
    }
}
