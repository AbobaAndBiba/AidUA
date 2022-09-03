import { Admin } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IAdminService extends CRUD {
    getOneByLogin(login: string): Promise<Admin | null>,
    generateId(): Promise<string>
}