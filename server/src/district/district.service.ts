import { Injectable } from '@nestjs/common';
import { AidUAService } from 'src/db/aid-ua.prisma.service';

@Injectable()
export class DistrictService {
    constructor(private aidUAService: AidUAService){}
}
