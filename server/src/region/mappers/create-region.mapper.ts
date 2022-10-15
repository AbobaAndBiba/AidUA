import { CreateRegionDto } from "../dto/create-region.dto";

class CreateRegionMapper {
    fromControllerToService(dto: CreateRegionDto): CreateRegionDto{
        return {
            name: dto.name
        };
    }
}

export const createRegionMapper = new CreateRegionMapper();