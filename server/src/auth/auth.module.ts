import { Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService
  ],
  imports: [
    DbModule,
    AdminModule,
    TokenModule
  ]
})
export class AuthModule {}
