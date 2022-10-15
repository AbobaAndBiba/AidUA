import { UpdateAidDto } from "../dto/update-aid.dto";

class UpdateAidMapper {
    fromFrontToController(dto: UpdateAidDto): UpdateAidDto{
        return {
            authorName: dto.authorName,
            phone: dto.phone,
            registration: dto.registration
        };
    }
}

export const updateAidMapper = new UpdateAidMapper();