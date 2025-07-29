import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log']
    });

    await app.listen(process.env.PORT || 3000);

    return app.getHttpServer();
  } catch (error) {
    console.error('Application startup error:', error);
    process.exit(1);
  }
}

bootstrap()