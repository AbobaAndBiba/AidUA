import { forwardRef, Module } from '@nestjs/common';
import { CoordinatesService } from './coordinates.service';
import { CoordinatesController } from './coordinates.controller';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { CoordinatesRepository } from './coordinates.repository';
import { PickupPointModule } from 'src/pickup-point/pickup-point.module';

@Module({
  controllers: [CoordinatesController],
  providers: [
    CoordinatesService,
    CoordinatesRepository
  ],
  imports: [
    DbModule,
    TokenModule,
    forwardRef(() => PickupPointModule),
  ],
  exports: [
    CoordinatesRepository
  ]
})
export class CoordinatesModule {}
