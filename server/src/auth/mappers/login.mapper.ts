import { LoginDto } from "../dto/login.dto";

class LoginMapper {
    fromControllerToService(dto: LoginDto): LoginDto{
        return {
           login: dto.login,
           password: dto.password
        };
    }
}

export const loginMapper = new LoginMapper();