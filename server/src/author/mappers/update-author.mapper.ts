import { UpdateAuthorDto } from "../dto/update-author.dto";

class UpdateAuthorMapper {
    fromControllerToService(dto: UpdateAuthorDto): UpdateAuthorDto{
        return {
            name: dto.name
        };
    }
}

export const updateAuthorMapper = new UpdateAuthorMapper();