import { IsString, Length } from "class-validator";

export class CreateNewsDto {
    id?: string;
    image?: string;

    @IsString({message: 'The text must be a string.'})
    @Length(2, 300, {message: 'The text can contain: 2 min and 300 max characters.'})
    text: string;
}