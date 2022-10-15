import { AddPrivilegesToAidDto } from "../dto/add-privileges-to-aid.dto";

class AddPrivilegesToAidMapper {
    fromFrontToController(dto: AddPrivilegesToAidDto): AddPrivilegesToAidDto{
        return {
            privileges: dto.privileges,
            aidId: dto.aidId
        };
    }
}

export const addPrivilegesToAidMapper = new AddPrivilegesToAidMapper();