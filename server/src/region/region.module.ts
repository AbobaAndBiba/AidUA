import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PickupPointModule } from 'src/pickup-point/pickup-point.module';
import { TokenModule } from 'src/token/token.module';
import { RegionController } from './region.controller';
import { RegionRepository } from './region.repository';
import { RegionService } from './region.service';

@Module({
  controllers: [RegionController],
  providers: [
    RegionService,
    RegionRepository
  ],
  imports: [
    DbModule,
    TokenModule,
    forwardRef(() => PickupPointModule),
  ],
  exports: [
    RegionService,
    RegionRepository
  ]
})
export class RegionModule {}
