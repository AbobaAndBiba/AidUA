import { IsArray, IsOptional } from "class-validator";

export class GetPickupPointsFrontDto {
    @IsOptional()
    @IsArray()
    where: {
        label: string, 
        value: string[]
    }[]
}