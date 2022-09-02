import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';

const addressServiceProvider = {
  provide: 'IAddressServiceRequest',
  useClass: AddressService
}

@Module({
  controllers: [AddressController],
  providers: [
    addressServiceProvider
  ],
  imports: [
    DbModule,
    TokenModule
  ]
})
export class AddressModule {}
