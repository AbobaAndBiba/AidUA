import { CreatePickupPointDto } from "../dto/create-pickup-point.dto";

class CreatePickupPointMapper {
    fromControllerToService(dto: CreatePickupPointDto): CreatePickupPointDto{
        return {
            aidId: dto.aidId,
            cityId: dto.cityId,
            regionId: dto.regionId,
            districtId: dto.districtId,
            addressId: dto.addressId,
            coordinatesId: dto.coordinatesId,
            name: dto.name
        };
    }
}

export const createPickupPointMapper = new CreatePickupPointMapper();