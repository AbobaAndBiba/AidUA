import { CreateCityDto } from "../dto/create-city.dto";

class CreateCityMapper {
    fromControllerToService(dto: CreateCityDto): CreateCityDto{
        return {
            name: dto.name
        };
    }
}

export const createCityMapper = new CreateCityMapper();