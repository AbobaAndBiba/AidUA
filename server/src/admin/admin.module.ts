import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [
    AdminService
  ],
  imports: [DbModule]
})
export class AdminModule {}
