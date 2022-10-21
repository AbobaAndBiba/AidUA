import { PickupPoint, Prisma } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IPickupPointRepository extends CRUD {
    getOneByName(name: string): Promise<PickupPoint | null>;
    generateId(): Promise<string>;
    getManyFront(filters: any): Promise<any>;
    deleteManyByCityId(cityId: string): Promise<Prisma.BatchPayload>;
    deleteManyByRegionId(regionId: string): Promise<Prisma.BatchPayload>;
    deleteManyByDistrictId(districtId: string): Promise<Prisma.BatchPayload>;
    deleteManyByAddressId(addressId: string): Promise<Prisma.BatchPayload>;
    deleteManyByCoordinatesId(coordinatesId: string): Promise<Prisma.BatchPayload>;
    deleteManyByAidId(aidId: string): Promise<Prisma.BatchPayload>;
}