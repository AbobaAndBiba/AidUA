import { IsOptional, IsString } from "class-validator";

export class UpdateCityAddressDto {

    @IsOptional()
    @IsString({message: 'The cityId must be a string.'})
    cityId: string;

    @IsOptional()
    @IsString({message: 'The addressId must be a string.'})
    addressId: string;
}