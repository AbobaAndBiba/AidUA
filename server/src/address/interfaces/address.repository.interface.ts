import { Address } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IAddressRepository extends CRUD {
    getOneByName(name: string): Promise<Address | null>,
    generateId(): Promise<string>
}