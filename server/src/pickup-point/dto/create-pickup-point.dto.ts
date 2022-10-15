import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePickupPointDto {
    id?: string;

    @IsString({message: 'The name must be a string.'})
    @Length(2, 30, {message: 'The name can contain: 2 min and 30 max characters.'})
    name: string;

    @IsString({message: 'The cityId must be a string.'})
    @IsNotEmpty()
    cityId?: string;

    @IsString({message: 'The regionId must be a string.'})
    @IsNotEmpty()
    regionId?: string;

    @IsString({message: 'The districtId must be a string.'})
    @IsNotEmpty()
    districtId?: string;

    @IsString({message: 'The addressId must be a string.'})
    @IsNotEmpty()
    addressId?: string;

    @IsString({message: 'The coordinatesId must be a string.'})
    @IsNotEmpty()
    coordinatesId?: string;

    @IsString({message: 'The aidId must be a string.'})
    @IsNotEmpty()
    aidId?: string;
}