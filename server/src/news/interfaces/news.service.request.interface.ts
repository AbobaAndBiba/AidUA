import { CreateNewsDto } from "../dto/create-news.dto";
import { UpdateNewsDto } from "../dto/update-new.dto";

export interface INewsServiceRequest {
    createReq(dto: CreateNewsDto, image: Express.Multer.File | null): any,
    getOneByIdReq(id: string): any,
    getManyReq(): any,
    updateReq(dto: UpdateNewsDto, id: string, image: Express.Multer.File | null): any,
    deleteReq(id: string): any,
}