import { IsString, Length } from "class-validator";

export class CreatePickupPointDto {
    id?: string;

    @IsString({message: 'The name must be a string.'})
    @Length(2, 30, {message: 'The name can contain: 2 min and 30 max characters.'})
    name: string;

    @IsString({message: 'The cityAddressId must be a string.'})
    cityAddressId: string;

    @IsString({message: 'The coordinatesId must be a string.'})
    coordinatesId: string;
}