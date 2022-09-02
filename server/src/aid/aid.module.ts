import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { AidController } from './aid.controller';
import { AidService } from './aid.service';

const aidServiceProvider = {
  provide: 'IAidServiceRequest',
  useClass: AidService
};

@Module({
  controllers: [AidController],
  providers: [
    aidServiceProvider
  ],
  imports: [
    DbModule,
    TokenModule
  ]
})
export class AidModule {}
