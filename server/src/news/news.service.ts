import { Injectable } from '@nestjs/common';
import { AidUAService } from 'src/db/aid-ua.prisma.service';

@Injectable()
export class NewsService{
    constructor(private aidUAService: AidUAService){}
}
