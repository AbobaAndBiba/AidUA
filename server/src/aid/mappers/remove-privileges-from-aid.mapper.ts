import { RemovePrivilegesFromAidDto } from "../dto/remove-privileges-from-aid.dto";

class RemovePrivilegesFromAidMapper {
    fromFrontToController(dto: RemovePrivilegesFromAidDto): RemovePrivilegesFromAidDto{
        return {
            privileges: dto.privileges,
            aidId: dto.aidId
        };
    }
}

export const removePrivilegesFromAidMapper = new RemovePrivilegesFromAidMapper();