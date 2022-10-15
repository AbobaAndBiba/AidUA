import { ArrayMinSize, IsArray, IsString } from "class-validator";

export class AddPrivilegesToAidDto {
    aidId?: string;

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    privileges: string[];
}