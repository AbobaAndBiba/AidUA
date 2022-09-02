import { CreateRegionDto } from "../dto/create-region.dto";
import { UpdateRegionDto } from "../dto/update-region.dto";

export interface IRegionServiceRequest {
    createReq(dto: CreateRegionDto): any,
    getOneByIdReq(id: string): any,
    getManyReq(): any,
    updateReq(dto: UpdateRegionDto, id: string): any
    deleteReq(id: string): any,
}