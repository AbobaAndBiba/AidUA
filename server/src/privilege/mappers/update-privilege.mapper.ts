import { UpdatePrivilegeDto } from "../dto/update-privilege.dto";

class UpdatePrivilegeMapper {
    fromControllerToService(dto: UpdatePrivilegeDto): UpdatePrivilegeDto{
        return {
            name: dto.name
        };
    }
}

export const updatePrivilegeMapper = new UpdatePrivilegeMapper();