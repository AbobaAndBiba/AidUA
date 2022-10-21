import { forwardRef, Module } from '@nestjs/common';
import { AidModule } from 'src/aid/aid.module';
import { DbModule } from 'src/db/db.module';
import { PickupPointModule } from 'src/pickup-point/pickup-point.module';
import { PrivilegeToAidModule } from 'src/privilege-to-aid/privilege-to-aid.module';
import { TokenModule } from 'src/token/token.module';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';

@Module({
  controllers: [AuthorController],
  providers: [
    AuthorService,
    AuthorRepository
  ],
  imports: [
    DbModule,
    TokenModule,
    forwardRef(() => AidModule),
    PrivilegeToAidModule,
    PickupPointModule
  ],
  exports: [
    AuthorRepository
  ]
})
export class AuthorModule {}
