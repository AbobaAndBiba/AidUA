import { RegistrationDto } from "../dto/registration.dto";

class RegistrationMapper {
    fromControllerToService(dto: RegistrationDto): RegistrationDto{
        return {
           login: dto.login,
           password: dto.password
        };
    }
}

export const registrationMapper = new RegistrationMapper();