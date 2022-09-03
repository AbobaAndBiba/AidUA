import "dotenv/config"
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from "./filters/not-found-exception.filter";
import { ValidationPipe } from "@nestjs/common";
import { STATIC_PATH } from "./paths/paths";

declare global {
  namespace Express {
      interface Request {
          admin?: Admin | undefined;
      }
  }
}

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new NotFoundExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe);
  app.useStaticAssets(STATIC_PATH);
  await app.listen(PORT, () => console.log(`The server has been started successfully on port: ${PORT}`));
}

start();
