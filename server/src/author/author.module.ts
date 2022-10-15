import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
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
    TokenModule
  ],
  exports: [
    AuthorRepository
  ]
})
export class AuthorModule {}
