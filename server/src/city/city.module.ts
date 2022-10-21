import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PickupPointModule } from 'src/pickup-point/pickup-point.module';
import { TokenModule } from 'src/token/token.module';
import { CityController } from './city.controller';
import { CityRepository } from './city.repository';
import { CityService } from './city.service';

@Module({
  controllers: [CityController],
  providers: [
    CityService,
    CityRepository
  ],
  imports:[
    DbModule,
    TokenModule,
    forwardRef(() => PickupPointModule),
  ],
  exports: [
    CityRepository
  ]
})
export class CityModule {}
