import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { AidModule } from './aid/aid.module';
import { RegionModule } from './region/region.module';
import { CityModule } from './city/city.module';
import { CoordinatesModule } from './coordinates/coordinates.module';
import { AddressModule } from './address/address.module';
import { PickupPointModule } from './pickup-point/pickup-point.module';
import { CityAddressModule } from './city-address/city-address.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV_FILE || '.env'
    }),
    AdminModule,
    DbModule,
    AuthModule,
    TokenModule,
    AidModule,
    RegionModule,
    CityModule,
    CityAddressModule,
    AddressModule,
    CoordinatesModule,
    PickupPointModule
  ]
})
export class AppModule {}
