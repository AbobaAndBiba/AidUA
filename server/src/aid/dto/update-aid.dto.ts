import { IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdateAidDto {
    @IsOptional()
    @IsString({message: 'The authorName must be a string.'})
    @Length(2, 30, {message: 'The authorName can contain: 2 min and 30 max characters.'})
    authorName: string;

    @IsOptional()
    @IsString({message: 'The registration must be a string.'})
    @Length(2, 100, {message: 'The registration can contain: 2 min and 100 max characters.'})
    registration: string;

    @IsOptional()
    @IsString({message: 'The phone must be a string.'})
    @Length(13, 13, {message: 'The phone can contain 13 characters only!'})
    @Matches(/^\+380([0-9]){9}$/)
    phone: string;
}