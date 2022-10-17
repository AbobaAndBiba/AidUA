import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdatePickupPointDto {
    @IsOptional()
    @IsString({message: 'The name must be a string.'})
    @Length(2, 30, {message: 'The name can contain: 2 min and 30 max characters.'})
    name: string;

    @IsOptional()
    @IsString({message: 'The cityId must be a string.'})
    @IsNotEmpty()
    cityId?: string;

    @IsOptional()
    @IsString({message: 'The regionId must be a string.'})
    @IsNotEmpty()
    regionId?: string;

    @IsOptional()
    @IsString({message: 'The districtId must be a string.'})
    @IsNotEmpty()
    districtId?: string;

    @IsOptional()
    @IsString({message: 'The addressId must be a string.'})
    @IsNotEmpty()
    addressId?: string;

    @IsOptional()
    @IsString({message: 'The coordinatesId must be a string.'})
    @IsNotEmpty()
    coordinatesId?: string;

    @IsOptional()
    @IsString({message: 'The aidId must be a string.'})
    @IsNotEmpty()
    aidId?: string;
}