import { CreateCityAddressDto } from "../dto/create-city-address.dto";
import { UpdateCityAddressDto } from "../dto/update-city-address.dto";

export interface ICityAddressServiceRequest {
    createReq(dto: CreateCityAddressDto): any,
    getOneByIdReq(id: string): any,
    getManyReq(): any,
    updateReq(dto: UpdateCityAddressDto, id: string): any
    deleteReq(id: string): any,
}