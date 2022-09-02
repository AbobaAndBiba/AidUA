import { IsOptional, IsNumber } from "class-validator";

export class UpdateCoordinatesDto {
    @IsOptional()
    @IsNumber()
    x: number;

    @IsOptional()
    @IsNumber()
    y: number;
}