import { IsOptional, IsString, Length } from "class-validator";

export class UpdateNewsDto {
    image?: string;

    @IsOptional()
    @IsString({message: 'The text must be a string.'})
    @Length(2, 300, {message: 'The text can contain: 2 min and 300 max characters.'})
    text: string
}