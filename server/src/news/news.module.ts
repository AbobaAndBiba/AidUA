import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [
    NewsService,
    NewsRepository
  ],
  imports: [
    DbModule,
    TokenModule
  ]
})
export class NewsModule {}
