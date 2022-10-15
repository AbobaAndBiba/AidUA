import { Injectable } from '@nestjs/common';
import { AidUAService } from 'src/db/aid-ua.prisma.service';

@Injectable()
export class PickupPointService  {
    constructor(private aidUAService: AidUAService){}
}
