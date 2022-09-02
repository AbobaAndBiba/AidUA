import { IsNumber } from "class-validator";

export class CreateCoordinatesDto {
    id?: string;

    @IsNumber()
    x: number;

    @IsNumber()
    y: number;
}