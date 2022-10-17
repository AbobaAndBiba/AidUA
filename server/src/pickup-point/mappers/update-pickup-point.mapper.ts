import { UpdatePickupPointDto } from "../dto/update-pickup-point.dto";

class UpdatePickupPointMapper {
    fromControllerToService(dto: UpdatePickupPointDto): UpdatePickupPointDto{
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

export const updatePickupPointMapper = new UpdatePickupPointMapper();