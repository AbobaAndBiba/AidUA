import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { AidModule } from './aid/aid.module';

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
  ]
})
export class AppModule {}
