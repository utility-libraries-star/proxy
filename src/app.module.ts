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
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meta } from './meta/meta.entity';
import { MetaController } from './meta/meta.controller';
import { MetaService } from './meta/meta.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.MYSQL_HOST,
    //   port: +process.env.MYSQL_PORT,
    //   username: process.env.MYSQL_USER,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DB,
    //   entities: [Meta],
    //   synchronize: true,
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // }),
    // TypeOrmModule.forFeature([Meta]),
    WidgetModule,
    OpenGraphModule,
    RssParserModule,
    ProxyModule,
  ],
  controllers: [
    MetaController,
    OpenGraphController,
    FormatController,
    MockRestApiController,
    RssParserController,
  ],
  providers: [
    MetaService,
    FormatService,
    MockRestApiService,
    OpenGraphService,
    RssParserService,
  ],
})
export class AppModule {}
