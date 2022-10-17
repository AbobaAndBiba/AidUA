import { Injectable } from '@nestjs/common';
import { AidUAService } from 'src/db/aid-ua.prisma.service';

@Injectable()
export class RegionService {
    constructor(private aidUAService: AidUAService){}
}
