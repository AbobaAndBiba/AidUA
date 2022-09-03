import { CreateAddressDto } from "src/address/dto/create-address.dto";
import { UpdateAddressDto } from "src/address/dto/update-address.dto";

export interface ICityServiceRequest {
    createReq(dto: CreateAddressDto): any,
    getOneByIdReq(id: string): any,
    getManyReq(): any,
    updateReq(dto: UpdateAddressDto, id: string): any
    deleteReq(id: string): any,
}