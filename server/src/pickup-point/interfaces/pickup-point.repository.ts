import { PickupPoint } from "prisma/generated/client";
import { CRUD } from "src/interfaces/crud.interface";

export interface IPickupPointRepository extends CRUD {
    getOneByName(name: string): Promise<PickupPoint | null>,
    generateId(): Promise<string>
}