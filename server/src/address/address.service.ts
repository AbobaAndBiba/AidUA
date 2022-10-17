import { Injectable } from '@nestjs/common';
import { AidUAService } from 'src/db/aid-ua.prisma.service';

@Injectable()
export class AddressService {
    constructor(private aidUAService: AidUAService){}
    
}
