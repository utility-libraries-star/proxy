import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
  );
  await app.init();
  return server;
}

// Экспортируем сервер для Vercel
export default bootstrap().then(app => app);