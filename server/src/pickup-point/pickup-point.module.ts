import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { PickupPointController } from './pickup-point.controller';
import { PickupPointService } from './pickup-point.service';

const pickupPointServiceProvider = {
  provide: 'IPickupPointService',
  useClass: PickupPointService
}

@Module({
  controllers: [PickupPointController],
  providers: [
    pickupPointServiceProvider
  ],
  imports:[
    DbModule,
    TokenModule
  ]
})
export class PickupPointModule {}
