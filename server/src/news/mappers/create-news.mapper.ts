import { CreateNewsDto } from "../dto/create-news.dto";

class CreateNewsMapper {
    fromControllerToService(dto: CreateNewsDto): CreateNewsDto{
        return {
            link: dto.link,
            text: dto.text,
            title: dto.title,
            image: dto.image
        };
    }
}

export const createNewsMapper = new CreateNewsMapper();