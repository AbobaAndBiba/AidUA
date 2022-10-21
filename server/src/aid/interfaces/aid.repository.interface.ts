import { Aid, Prisma } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IAidRepository extends CRUD {
    generateId(): Promise<string>;
    deleteManyByAuthorId(authorId: string): Promise<Prisma.BatchPayload>;
    getManyByAuthorId(authorId: string): Promise<Aid[]>;
}