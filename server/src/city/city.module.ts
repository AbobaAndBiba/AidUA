import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { CityController } from './city.controller';
import { CityService } from './city.service';

const cityServicerProvider = {
  provide: 'ICityServiceRequest',
  useClass: CityService
}

@Module({
  controllers: [CityController],
  providers: [
    cityServicerProvider
  ],
  imports:[
    DbModule,
    TokenModule
  ]
})
export class CityModule {}
