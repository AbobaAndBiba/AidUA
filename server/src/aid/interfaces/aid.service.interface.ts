import { Aid } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IAidService extends CRUD {
    getOneByName(name: string): Promise<Aid | null>,
    generateId(): Promise<string>
}