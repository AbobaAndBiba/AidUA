import { News } from "prisma/generated/client";

export interface INewsPagination {
    news: News[];
    total: number;
}