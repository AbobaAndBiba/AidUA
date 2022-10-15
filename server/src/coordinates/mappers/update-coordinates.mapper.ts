import { UpdateCoordinatesDto } from "../dto/update-coordinates.dto";

class UpdateCoordinatesMapper {
    fromControllerToService(dto: UpdateCoordinatesDto): UpdateCoordinatesDto{
        return {
            x: dto.x,
            y: dto.y
        };
    }
}

export const updateCoordinatesMapper = new UpdateCoordinatesMapper();