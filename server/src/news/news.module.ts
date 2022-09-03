import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { TokenModule } from 'src/token/token.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

const newsServiceProvider = {
  provide: 'INewsServiceRequest',
  useClass: NewsService
};

@Module({
  controllers: [NewsController],
  providers: [newsServiceProvider],
  imports: [
    DbModule,
    FileUploadModule,
    TokenModule
  ]
})
export class NewsModule {}
