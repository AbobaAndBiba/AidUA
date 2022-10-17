import { Privilege } from "prisma/generated/client";

export interface IAidService{
    addPrivileges(privileges: string[], aidId: string): Promise<Privilege[]>,
    removePrivileges(privileges: string[], aidId: string): Promise<Privilege[]>,
}