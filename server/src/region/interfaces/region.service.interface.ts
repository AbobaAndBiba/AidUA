import { Region } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IRegionService extends CRUD {
    getOneByName(name: string): Promise<Region | null>,
    generateId(): Promise<string>
}