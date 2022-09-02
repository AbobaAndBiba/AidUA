import { IsString, Length } from "class-validator";

export class LoginDto {
    @IsString({message: 'The login must be a string.'})
    @Length(5, 30, {message: 'The login can contain: 5 min and 30 max characters.'})
    login: string;

    @IsString({message: 'The password must be a string.'})
    @Length(3, 30, {message: 'The password can contain: 3 min and 30 max characters.'})
    password: string;
}