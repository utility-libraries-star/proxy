import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FormatController } from './format/format.controller';
import { FormatService } from './format/format.service';
import { MockRestApiController } from './mock-rest-api/mock-rest-api.controller';
import { MockRestApiService } from './mock-rest-api/mock-rest-api.service';
import { ProxyController } from './proxy/proxy.controller';
import { WidgetModule } from './widget/widget.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    WidgetModule,
  ],
  controllers: [FormatController, MockRestApiController, ProxyController],
  providers: [FormatService, MockRestApiService],
})
export class AppModule {}
