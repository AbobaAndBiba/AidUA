import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { PrivilegeService } from './privilege.service';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeToAidModule } from 'src/privilege-to-aid/privilege-to-aid.module';
import { PrivilegeRepository } from './privilege.repository';

@Module({
  providers: [
    PrivilegeService,
    PrivilegeRepository
  ],
  controllers: [PrivilegeController],
  imports: [
    DbModule,
    TokenModule,
    PrivilegeToAidModule
  ],
  exports: [
    PrivilegeRepository
  ]
})
export class PrivilegeModule {}
