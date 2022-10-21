import { Token } from "prisma/generated/client";

export interface ITokenRpository {
    getOneByAdminId(adminId: string): Promise<Token | null>;
    getAll(): Promise<Token[]>;
    disactivateToken(token: Token): Promise<Token>;
}