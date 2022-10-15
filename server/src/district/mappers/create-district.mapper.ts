import { CreateDistrictDto } from "../dto/create-district.dto";

class CreateDistrictMapper {
    fromControllerToService(dto: CreateDistrictDto): CreateDistrictDto{
        return {
            name: dto.name
        };
    }
}

export const createDistrictMapper = new CreateDistrictMapper();