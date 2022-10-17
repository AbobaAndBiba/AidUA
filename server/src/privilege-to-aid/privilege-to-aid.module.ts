import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PrivilegeToAidRepository } from './privilege-to-aid.repository';
import { PrivilegeToAidService } from './privilege-to-aid.service';

@Module({
  providers: [
    PrivilegeToAidService,
    PrivilegeToAidRepository
  ],
  imports: [
    DbModule
  ],
  exports: [
    PrivilegeToAidRepository
  ]
})
export class PrivilegeToAidModule {}
