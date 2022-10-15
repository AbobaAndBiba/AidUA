import { Injectable } from '@nestjs/common';
import { PickupPoint, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { IPickupPointRepository } from './interfaces/pickup-point.repository';

@Injectable()
export class PickupPointRepository implements IPickupPointRepository {
    constructor(private aidUAService: AidUAService){}

    async create(dto: Prisma.PickupPointUncheckedCreateInput): Promise<PickupPoint> {
        return this.aidUAService.pickupPoint.create({data: dto});
    }

    async getOneById(id: string): Promise<PickupPoint | null> {
        return this.aidUAService.pickupPoint.findUnique({where: {id}});
    }

    async getOneByName(name: string): Promise<PickupPoint | null> {
        return this.aidUAService.pickupPoint.findFirst({where:{name}});
    }

    async getMany(): Promise<PickupPoint[]> {
        return this.aidUAService.pickupPoint.findMany();
    }

    async update(dto: Prisma.PickupPointUncheckedUpdateInput, id: string): Promise<PickupPoint | null> {
        return this.aidUAService.pickupPoint.update({where: {id}, data: dto});
    }

    async delete(id: string): Promise<PickupPoint | null> {
        return this.aidUAService.pickupPoint.delete({where: {id}});
    }

    async generateId(): Promise<string>{
        let pickupPoint: PickupPoint | null, id: string;
        do {
            id = v4();
            pickupPoint = await this.aidUAService.pickupPoint.findUnique({where: {id}});
        } while (pickupPoint);
        return id;
    }
}
