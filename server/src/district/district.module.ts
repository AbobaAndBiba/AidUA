import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { DistrictRepository } from './district.repository';
import { PickupPointModule } from 'src/pickup-point/pickup-point.module';

@Module({
  providers: [
    DistrictService,
    DistrictRepository
  ],
  controllers: [DistrictController],
  imports:[
    DbModule,
    TokenModule,
    forwardRef(() => PickupPointModule),
  ],
  exports: [
    DistrictRepository
  ],
})
export class DistrictModule {}
