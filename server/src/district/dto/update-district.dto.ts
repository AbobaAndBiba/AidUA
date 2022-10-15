import { IsString, Length } from "class-validator";

export class UpdateDistrictDto {
    @IsString()
    @Length(2, 30, {message: 'The name can contain: 2 min and 30 max characters.'})
    name: string;
}