import { Coordinates } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface ICoordinatesRepository extends CRUD {
    getOneByValues(x: number, y:number): Promise<Coordinates | null>,
    generateId(): Promise<string>
}