import { UpdateAddressDto } from "../dto/update-address.dto";

class UpdateAddressMapper {
    fromFrontToController(dto: UpdateAddressDto): UpdateAddressDto{
        return {
            name: dto.name
        };
    }
}

export const updateAddressMapper = new UpdateAddressMapper();