import { Module } from '@nestjs/common';
import { FormatController } from './format/format.controller';
import { FormatService } from './format/format.service';
import { MockRestApiController } from './mock-rest-api/mock-rest-api.controller';
import { MockRestApiService } from './mock-rest-api/mock-rest-api.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProxyController } from './proxy/proxy.controller';
import { ProxyService } from './proxy/proxy.service';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [FormatController, MockRestApiController, ProxyController],
  providers: [FormatService, MockRestApiService, ProxyService],
})
export class AppModule {}
