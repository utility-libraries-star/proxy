import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { createServer, proxy } from 'aws-serverless-express';
import { Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let cachedServer;

async function bootstrapServer() {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await app.init();
    return createServer(expressApp);
}

export const handler: Handler = async (event, context) => {
    cachedServer = cachedServer ?? (await bootstrapServer());
    return proxy(cachedServer, event, context, 'PROMISE').promise;
};