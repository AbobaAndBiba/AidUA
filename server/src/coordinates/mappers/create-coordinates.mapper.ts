import { CreateCoordinatesDto } from "../dto/create-coordinates.dto";

class CreateCoordinatesMapper {
    fromControllerToService(dto: CreateCoordinatesDto): CreateCoordinatesDto{
        return {
            x: dto.x,
            y: dto.y
        };
    }
}

export const createCoordinatesMapper = new CreateCoordinatesMapper();