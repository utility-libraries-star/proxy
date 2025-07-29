import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { OpenGraphService } from './opengraph.service';
import { OpenGraphController } from './opengraph.controller';

@Module({
  imports: [
    CacheModule.register({
      ttl: 7200, // 2 часа
      isGlobal: true
    })
  ],
  controllers: [OpenGraphController],
  providers: [OpenGraphService]
})
export class OpenGraphModule {}
