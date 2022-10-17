import { Author } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IAuthorRepository extends CRUD {
    generateId(): Promise<string>,
    getOneByName(name: string): Promise<Author>
}