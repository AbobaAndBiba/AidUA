import { CreatePickupPointDto } from "../dto/create-pickup-point.dto";
import { UpdatePickupPointDto } from "../dto/update-pickup-point.dto";


export interface IPickupPointServiceRequest {
    createReq(dto: CreatePickupPointDto): any,
    getOneByIdReq(id: string): any,
    getManyReq(): any,
    updateReq(dto: UpdatePickupPointDto, id: string): any
    deleteReq(id: string): any,
}