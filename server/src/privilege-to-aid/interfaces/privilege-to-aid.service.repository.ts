import { Prisma, PrivilegeToAid } from "prisma/generated/client";

export interface IPrivilegeToAidRepository {
    getManyByAidId(aidId: string): Promise<PrivilegeToAid[]>,
    getOneByPrivilegeIdAndAidId(privilegeId: string, aidId: string): Promise<PrivilegeToAid>,
    create(dto: Prisma.PrivilegeToAidUncheckedCreateInput),
    delete(privilegeName: string, aidId: string): Promise<PrivilegeToAid>,
    deleteManyByAidId(aidId: string): Promise<Object>,
    deleteManyByPrivilegeId(privilegeId: string): Promise<Object>,
}