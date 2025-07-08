import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FormatController } from './format/format.controller';
import { FormatService } from './format/format.service';
import { MockRestApiController } from './mock-rest-api/mock-rest-api.controller';
import { MockRestApiService } from './mock-rest-api/mock-rest-api.service';
import { WidgetModule } from './widget/widget.module';
import { OpenGraphModule } from './opengraph/opengraph.module';
import { OpenGraphController } from './opengraph/opengraph.controller';
import { OpenGraphService } from './opengraph/opengraph.service';
import { RssParserModule } from './rss-parser/rss-parser.module';
import { RssParserController } from './rss-parser/rss-parser.controller';
import { RssParserService } from './rss-parser/rss-parser.service';
import { ProxyModule } from './proxy/proxy.module';
import { ProxyService } from './proxy/proxy.service';
import { ProxyController } from './proxy/proxy.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    WidgetModule,
    OpenGraphModule,
    RssParserModule,
    ProxyModule,
  ],
  controllers: [
    OpenGraphController,
    FormatController,
    MockRestApiController,
    RssParserController,
  ],
  providers: [
    FormatService,
    MockRestApiService,
    OpenGraphService,
    RssParserService,
  ],
})
export class AppModule {}
