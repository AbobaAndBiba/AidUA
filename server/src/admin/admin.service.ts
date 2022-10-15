import { Injectable } from '@nestjs/common';
import { AidUAService } from 'src/db/aid-ua.prisma.service';

@Injectable()
export class AdminService {
    constructor(private aidUAService: AidUAService){}
    
}
