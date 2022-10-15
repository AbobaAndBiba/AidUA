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
import { NewsModule } from './news/news.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthorModule } from './author/author.module';
import { PrivilegeModule } from './privilege/privilege.module';
import { PrivilegeToAidModule } from './privilege-to-aid/privilege-to-aid.module';
import { DistrictModule } from './district/district.module';

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
    AddressModule,
    CoordinatesModule,
    PickupPointModule,
    NewsModule,
    FileUploadModule,
    AuthorModule,
    PrivilegeModule,
    PrivilegeToAidModule,
    DistrictModule
  ]
})
export class AppModule {}
