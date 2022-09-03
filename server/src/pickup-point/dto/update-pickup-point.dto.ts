import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdatePickupPointDto {
    @IsOptional()
    @IsString({message: 'The name must be a string.'})
    @Length(2, 30, {message: 'The name can contain: 2 min and 30 max characters.'})
    name: string;

    @IsOptional()
    @IsString({message: 'The cityAddressId must be a string.'})
    @IsNotEmpty()
    cityAddressId: string;

    @IsOptional()
    @IsString({message: 'The coordinatesId must be a string.'})
    @IsNotEmpty()
    coordinatesId: string;
}