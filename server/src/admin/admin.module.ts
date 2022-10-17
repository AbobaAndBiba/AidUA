import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminRepository
  ],
  imports: [
    DbModule
  ],
  exports: [
    AdminRepository
  ]
})
export class AdminModule {}
