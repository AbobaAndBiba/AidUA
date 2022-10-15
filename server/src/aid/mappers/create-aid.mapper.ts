import { CreateAidDto } from "../dto/create-aid.dto";

class CreateAidMapper {
    fromFrontToController(dto: CreateAidDto): CreateAidDto{
        return {
            authorName: dto.authorName,
            phone: dto.phone,
            registration: dto.registration
        };
    }
}

export const createAidMapper = new CreateAidMapper();