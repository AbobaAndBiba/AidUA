import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

const regionServicerProvider = {
  provide: 'IRegionServiceRequest',
  useClass: RegionService
}

@Module({
  controllers: [RegionController],
  providers: [
    regionServicerProvider
  ],
  imports: [
    DbModule,
    TokenModule
  ]
})
export class RegionModule {}
