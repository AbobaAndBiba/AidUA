import { Module } from '@nestjs/common';
import { CoordinatesService } from './coordinates.service';
import { CoordinatesController } from './coordinates.controller';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';

const coordinatesServicerProvider = {
  provide: 'ICoordinatesServiceRequest',
  useClass: CoordinatesService
}

@Module({
  controllers: [CoordinatesController],
  providers: [
    coordinatesServicerProvider
  ],
  imports: [
    DbModule,
    TokenModule
  ]
})
export class CoordinatesModule {}
