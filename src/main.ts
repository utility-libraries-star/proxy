import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Отключаем логирование при старте для Vercel
    logger: ['error', 'warn'],
  });

  await app.listen(process.env.PORT || 3000);
  return app.getHttpServer();
}

// Экспортируем промис, который разрешается в сервер
const server = bootstrap();
export default server;