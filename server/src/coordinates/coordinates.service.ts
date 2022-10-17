import { Injectable } from '@nestjs/common';
import { AidUAService } from 'src/db/aid-ua.prisma.service';

@Injectable()
export class CoordinatesService {
    constructor(private aidUAService: AidUAService){}
}
