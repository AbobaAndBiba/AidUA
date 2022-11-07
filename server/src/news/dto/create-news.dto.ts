import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateNewsDto {
    id?: string;
    
    @IsString({message: 'The title must be a string.'})
    @Length(2, 30, {message: 'The title can contain: 2 min and 30 max characters.'})
    title: string;

    @IsString({message: 'The text must be a string.'})
    @Length(2, 300, {message: 'The text can contain: 2 min and 300 max characters.'})
    text: string;

    @IsString({message: 'The link must be a string.'})
    @Length(2, 300, {message: 'The link can contain: 2 min and 300 max characters.'})
    link: string;

    @IsString({message: 'The image must be a string.'})
    @IsNotEmpty({message: "The image can't be empty."})
    image?: string;
}