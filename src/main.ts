import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let appInstance;

export default async function handler(req, res) {
  if (!appInstance) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    appInstance = app.getHttpAdapter().getInstance(); // express
  }

  return appInstance(req, res);
}
