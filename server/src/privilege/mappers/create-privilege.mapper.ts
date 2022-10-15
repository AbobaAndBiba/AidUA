import { CreatePrivilegeDto } from "../dto/create-privilege.dto";

class CreatePrivilegeMapper {
    fromControllerToService(dto: CreatePrivilegeDto): CreatePrivilegeDto{
        return {
            name: dto.name
        };
    }
}

export const createPrivilegeMapper = new CreatePrivilegeMapper();