import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Handler, Request, Response, NextFunction } from 'express';

const expressApp = express();

let cachedServer: Handler;

export async function handler(req: Request, res: Response, next: NextFunction) {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await app.init();
    cachedServer = expressApp;
  }
  return cachedServer(req, res, next);
}