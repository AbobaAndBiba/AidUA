import { Address } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IAddressService extends CRUD {
    getOneByName(name: string): Promise<Address | null>,
    generateId(): Promise<string>
}