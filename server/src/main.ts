import "dotenv/config"
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  await app.listen(PORT, () => console.log(`The server has been started successfully on port: ${PORT}`));
}

start();
