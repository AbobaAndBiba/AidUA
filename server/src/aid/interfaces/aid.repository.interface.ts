import { CRUD } from "src/interfaces/crud.interface";

export interface IAidRepository extends CRUD {
    generateId(): Promise<string>
}