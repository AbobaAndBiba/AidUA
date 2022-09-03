import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { CityAddressController } from './city-address.controller';
import { CityAddressService } from './city-address.service';

const cityAddressServicerProvider = {
  provide: 'ICityAddressServiceRequest',
  useClass: CityAddressService
}

@Module({
  controllers: [CityAddressController],
  providers: [
    cityAddressServicerProvider
  ],
  imports:[
    DbModule,
    TokenModule
  ]
})
export class CityAddressModule {}
