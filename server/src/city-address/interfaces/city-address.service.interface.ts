import { CityAddress } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface ICityAddressService extends CRUD {
    getOneByValues(cityId: string, addressId: string): Promise<CityAddress | null>,
    generateId(): Promise<string>
}