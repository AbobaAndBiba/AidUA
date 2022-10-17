import { UpdateCityDto } from "../dto/update-city.dto";

class UpdateCityMapper {
    fromControllerToService(dto: UpdateCityDto): UpdateCityDto{
        return {
            name: dto.name
        };
    }
}

export const updateCityMapper = new UpdateCityMapper();