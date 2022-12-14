import { forwardRef, Module } from '@nestjs/common';
import { AuthorModule } from 'src/author/author.module';
import { DbModule } from 'src/db/db.module';
import { PickupPointModule } from 'src/pickup-point/pickup-point.module';
import { PrivilegeToAidModule } from 'src/privilege-to-aid/privilege-to-aid.module';
import { PrivilegeModule } from 'src/privilege/privilege.module';
import { TokenModule } from 'src/token/token.module';
import { AidController } from './aid.controller';
import { AidRepository } from './aid.repository';
import { AidService } from './aid.service';

@Module({
  controllers: [AidController],
  providers: [
    AidService,
    AidRepository
  ],
  imports: [
    DbModule,
    TokenModule,
    forwardRef(() => AuthorModule),
    PrivilegeModule,
    PrivilegeToAidModule,
    forwardRef(() => PickupPointModule),
  ],
  exports: [
    AidRepository,
    AidService
  ]
})
export class AidModule {}
