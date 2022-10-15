import { News } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface INewsRepository extends CRUD {
    getByDate(date: Date): Promise<News[]>,
    generateId(): Promise<string>
}