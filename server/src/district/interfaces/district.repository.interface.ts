import { District } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IDistrictRepository extends CRUD {
    getOneByName(name: string): Promise<District | null>,
    generateId(): Promise<string>
}