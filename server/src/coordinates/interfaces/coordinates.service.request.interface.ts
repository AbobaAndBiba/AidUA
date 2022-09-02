import { CreateCoordinatesDto } from "../dto/create-coordinates.dto";
import { UpdateCoordinatesDto } from "../dto/update-coordinates.dto";

export interface ICoordinatesServiceRequest {
    createReq(dto: CreateCoordinatesDto): any,
    getOneByIdReq(id: string): any,
    getManyReq(): any,
    updateReq(dto: UpdateCoordinatesDto, id: string): any
    deleteReq(id: string): any,
}