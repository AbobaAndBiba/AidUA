import { CreateAuthorDto } from "../dto/create-author.dto";

class CreateAuthorMapper {
    fromControllerToService(dto: CreateAuthorDto): CreateAuthorDto{
        return {
            name: dto.name
        };
    }
}

export const createAuthorMapper = new CreateAuthorMapper();