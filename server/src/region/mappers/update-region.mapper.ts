import { UpdateRegionDto } from "../dto/update-region.dto";

class UpdateRegionMapper {
    fromControllerToService(dto: UpdateRegionDto): UpdateRegionDto{
        return {
            name: dto.name
        };
    }
}

export const updateRegionMapper = new UpdateRegionMapper();