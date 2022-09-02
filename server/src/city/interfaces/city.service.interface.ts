import { City } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface ICityService extends CRUD {
    getOneByName(name: string): Promise<City | null>,
    generateId(): Promise<string>
}