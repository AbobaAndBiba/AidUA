import { HttpException, Injectable } from '@nestjs/common';
import { CityAddress, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { v4 } from "uuid";
import { CreateCityAddressDto } from './dto/create-city-address.dto';
import { UpdateCityAddressDto } from './dto/update-city-address.dto';
import { ICityAddressService } from './interfaces/city-address.service.interface';
import { ICityAddressServiceRequest } from './interfaces/city-address.service.request.interface';

@Injectable()
export class CityAddressService implements ICityAddressService,ICityAddressServiceRequest {
    constructor(private aidUAService: AidUAService){}

    async createReq(dto: CreateCityAddressDto){
        const checkAdressCityExisting = await this.getOneByValues(dto.cityId,dto.addressId);
        if(checkAdressCityExisting)
            throw new HttpException('This city address already exist.', 400);
        const id = await this.generateId();
        const cityAddress = await this.create({...dto, id});
        return cityAddress ;    
    }

    async getOneByIdReq(id: string) {
        const cityAddress = await this.getOneById(id);
        if(!cityAddress)
            throw new HttpException('This city address was not found.', 404);
        return cityAddress;
    }

    async getManyReq() {
        return this.getMany();
    }

    async updateReq(dto: UpdateCityAddressDto, id: string) {
        let cityAddress = await this.getOneById(id);
        if(!cityAddress)
            throw new HttpException('This city was not found.', 404);
        if(dto.cityId || dto.addressId){
            const checkValues = await this.getOneByValues(dto.cityId? dto.cityId:cityAddress.cityId, dto.addressId? dto.addressId:cityAddress.addressId);
            if(!checkValues)
                throw new HttpException('This city already exists', 400);
            cityAddress = await this.update(dto, id);
        }
        return cityAddress;
    }

    async deleteReq(id:string){
        const cityAddress = await this.getOneById(id);
        if(!cityAddress)
            throw new HttpException('This city address not found.', 404);
        await this.delete(cityAddress.id);
        return { message: 'The city address has been delete successfully'};
    }

    async create(dto: Prisma.CityAddressUncheckedCreateInput): Promise<CityAddress>{
        return this.aidUAService.cityAddress.create({data:dto});
    }

    async getOneById(id: string): Promise<CityAddress | null> {
        return this.aidUAService.cityAddress.findUnique({where: {id}});
    }

    async getOneByValues(cityId: string, addressId: string): Promise<CityAddress | null>{
        return this.aidUAService.cityAddress.findFirst({where:{cityId, addressId}});
    }

    async getMany():Promise<CityAddress[]>{
        return this.aidUAService.cityAddress.findMany();
    }

    async update(dto:Prisma.CityAddressUncheckedUpdateInput, id:string):Promise<CityAddress | null>{
        return this.aidUAService.cityAddress.update({where: {id}, data:dto});
    }

    async delete(id: string): Promise<CityAddress | null> {
        return this.aidUAService.cityAddress.delete({where:{id}});
    }

    async generateId(): Promise<string>{
        let cityAddress: CityAddress | null, id: string;
        do {
            id = v4();
            cityAddress = await this.aidUAService.cityAddress.findUnique({where: {id}});
        } while (cityAddress);
        return id;
    }
}