import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  providers: [
    TokenService,
    TokenRepository
  ],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwtsecret',
      signOptions: {
        expiresIn: '1h'
      }
    }),
    DbModule,
  ],
  exports: [
    TokenService,
    TokenRepository,
    JwtModule
  ]
})
export class TokenModule {}
