import { Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { AidModule } from 'src/aid/aid.module';
import { CityModule } from 'src/city/city.module';
import { CoordinatesModule } from 'src/coordinates/coordinates.module';
import { DbModule } from 'src/db/db.module';
import { DistrictModule } from 'src/district/district.module';
import { PrivilegeToAidModule } from 'src/privilege-to-aid/privilege-to-aid.module';
import { RegionModule } from 'src/region/region.module';
import { TokenModule } from 'src/token/token.module';
import { PickupPointController } from './pickup-point.controller';
import { PickupPointRepository } from './pickup-point.repository';
import { PickupPointService } from './pickup-point.service';

@Module({
  controllers: [PickupPointController],
  providers: [
    PickupPointRepository,
    PickupPointService
  ],
  imports:[
    DbModule,
    TokenModule,
    CityModule,
    CoordinatesModule,
    AidModule,
    RegionModule,
    DistrictModule,
    AddressModule,
    PrivilegeToAidModule
  ]
})
export class PickupPointModule {}
