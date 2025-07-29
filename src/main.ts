import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'http';

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  server = createServer(instance);
  return server;
}

if (require.main === module) {
  bootstrap().then((srv) => srv.listen(3000));
}

export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }
  server.emit('request', req, res);
}
