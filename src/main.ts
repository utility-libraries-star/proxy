import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import type { Request, Response, NextFunction } from 'express';

const expressApp = express();

let cachedServer: express.Handler;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();
  cachedServer = expressApp;
}

export default async function handler(req: Request, res: Response, next: NextFunction) {
  if (!cachedServer) {
    await bootstrapServer();
  }
  return cachedServer(req, res, next);
}