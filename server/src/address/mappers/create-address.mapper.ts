import { CreateAddressDto } from "../dto/create-address.dto";

class CreateAddressMapper {
    fromFrontToController(dto: CreateAddressDto): CreateAddressDto{
        return {
            name: dto.name
        };
    }
}

export const createAddressMapper = new CreateAddressMapper();