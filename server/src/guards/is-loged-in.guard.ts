import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AidUAService } from "../db/aid-ua.prisma.service";

@Injectable()
export class IsLogedInGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private aidUAService: AidUAService){}

    async canActivate(context: ExecutionContext) {
        try {
            const req = context.switchToHttp().getRequest();
            const token = req.headers.authorization?.split(' ')[1];
            if(!token)
                throw new HttpException('No authorization', 401);
            const admin = this.jwtService.verify<Express.Admin>(token);
            if(!admin)
                throw new HttpException('No authorization', 401);
            const tokenDB = await this.aidUAService.token.findFirst({where: {adminId: admin.id}});
            if(!tokenDB || !tokenDB.isActive)
                throw new HttpException('No authorization', 401);
            req.admin = admin;
            return true;
        } catch (error) {
            if(error instanceof HttpException)
                throw error;
            throw new HttpException('No authorization', 401);
        }
    }
}