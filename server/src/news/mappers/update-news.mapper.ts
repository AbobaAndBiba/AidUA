import { UpdateNewsDto } from "../dto/update-new.dto";

class UpdateNewsMapper {
    fromControllerToService(dto: UpdateNewsDto): UpdateNewsDto{
        return {
            link: dto.link,
            text: dto.text,
            title: dto.title,
            image: dto.image
        };
    }
}

export const updateNewsMapper = new UpdateNewsMapper();