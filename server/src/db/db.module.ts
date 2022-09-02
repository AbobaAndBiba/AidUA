import { Module } from '@nestjs/common';
import { AidUAService } from './aid-ua.prisma.service';

@Module({
    providers: [AidUAService],
    exports: [AidUAService]
})
export class DbModule {}
