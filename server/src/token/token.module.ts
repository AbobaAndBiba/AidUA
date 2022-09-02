import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
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
    JwtModule
  ]
})
export class TokenModule {}
