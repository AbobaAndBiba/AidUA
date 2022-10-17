import { Privilege } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IPrivilegeRepository extends CRUD {
    generateId(): Promise<string>,
    getOneByName(name: string): Promise<Privilege>
}