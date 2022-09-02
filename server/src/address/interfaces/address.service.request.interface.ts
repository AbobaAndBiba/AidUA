import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";

export interface IAddressServiceRequest {
    createReq(dto: CreateAddressDto): any,
    getOneByIdReq(id: string): any,
    getManyReq(): any,
    updateReq(dto: UpdateAddressDto, id: string): any
    deleteReq(id: string): any,
}