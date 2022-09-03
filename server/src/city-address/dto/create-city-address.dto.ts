import { IsString } from "class-validator";

export class CreateCityAddressDto {
    id?: string;

    @IsString({message: 'The cityId must be a string.'})
    cityId: string;

    @IsString({message: 'The addressId must be a string.'})
    addressId: string;
}