import { CreateAidDto } from "../dto/create-aid.dto";
import { UpdateAidDto } from "../dto/update-aid.dto";

export interface IAidServiceRequest {
    createReq(dto: CreateAidDto): any,
    getOneByIdReq(id: string): any,
    getManyReq(): any,
    updateReq(dto: UpdateAidDto, id: string): any
    deleteReq(id: string): any,
}