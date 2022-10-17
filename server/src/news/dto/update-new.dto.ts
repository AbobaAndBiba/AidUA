import { IsOptional, IsString, Length } from "class-validator";

export class UpdateNewsDto {
    @IsOptional()
    @Length(1, 300, {message: 'The image can contain: 2 min and 300 max characters.'})
    image?: string;

    @IsOptional()
    @IsString({message: 'The title must be a string.'})
    @Length(2, 30, {message: 'The title can contain: 2 min and 30 max characters.'})
    title: string;

    @IsOptional()
    @IsString({message: 'The text must be a string.'})
    @Length(2, 300, {message: 'The text can contain: 2 min and 300 max characters.'})
    text: string

    @IsOptional()
    @IsString({message: 'The link must be a string.'})
    @Length(2, 300, {message: 'The link can contain: 2 min and 300 max characters.'})
    link: string;
}