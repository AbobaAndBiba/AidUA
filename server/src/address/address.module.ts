import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { AddressRepository } from './address.repository';

@Module({
  controllers: [AddressController],
  providers: [
    AddressService,
    AddressRepository
  ],
  imports: [
    DbModule,
    TokenModule
  ],
  exports: [
    AddressRepository
  ]
})
export class AddressModule {}
