import { HttpException, Injectable } from '@nestjs/common';
import { PickupPoint, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { CreatePickupPointDto } from './dto/create-pickup-point.dto';
import { UpdatePickupPointDto } from './dto/update-pickup-point.dto';
import { IPickupPointService } from './interfaces/pickup-point.interface';
import { IPickupPointServiceRequest } from './interfaces/pickup-point.request.interface';

@Injectable()
export class PickupPointService implements IPickupPointService,IPickupPointServiceRequest {
    constructor(private aidUAService: AidUAService){}

    async createReq(dto: CreatePickupPointDto) {
        const checkPickupPointExisting = await this.getOneByName(dto.name);
        if(checkPickupPointExisting)
            throw new HttpException('This city already exist.', 400);
        const id = await this.generateId();
        const city = await this.create({...dto, id});
        return city;
    }

    async getOneByIdReq(id: string) {
        const pickupPoint = await this.getOneById(id);
        if(!pickupPoint)
            throw new HttpException('This pickup point was not found.', 404);
        return pickupPoint;
    }

    async getManyReq() {
        return this.getMany();
    }

    async updateReq(dto: UpdatePickupPointDto, id: string) {
        let pickupPoint = await this.getOneById(id);
        if(!pickupPoint)
            throw new HttpException('This pickup point was not found.', 404);
        if(dto.name){
            const checkName = await this.getOneByName(dto.name);
            if(checkName)
                throw new HttpException('This pickup point already exists', 400);
            pickupPoint = await this.update(dto, id);
        }
        return pickupPoint;
    }

    async deleteReq(id: string) {
        const pickupPoint = await this.getOneById(id);
        if(!pickupPoint)
            throw new HttpException('This pickup point not found.', 404);
        await this.delete(pickupPoint.id);
        return { message: 'The pickup point has been delete successfully'};
    }

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
