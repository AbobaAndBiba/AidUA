import { UpdateDistrictDto } from "../dto/update-district.dto";

class UpdateDistrictMapper {
    fromControllerToService(dto: UpdateDistrictDto): UpdateDistrictDto{
        return {
            name: dto.name
        };
    }
}

export const updateDistrictMapper = new UpdateDistrictMapper();