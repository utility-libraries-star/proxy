import {Module} from '@nestjs/common';
import {FormatController} from './format/format.controller';
import {FormatService} from './format/format.service';
import {MockRestApiController} from './mock-rest-api/mock-rest-api.controller';
import {MockRestApiService} from './mock-rest-api/mock-rest-api.service';
import {WidgetModule} from './widget/widget.module';
import {OpenGraphModule} from './opengraph/opengraph.module';
import {OpenGraphController} from './opengraph/opengraph.controller';
import {OpenGraphService} from './opengraph/opengraph.service';
import {RssParserModule} from './rss-parser/rss-parser.module';
import {RssParserController} from './rss-parser/rss-parser.controller';
import {RssParserService} from './rss-parser/rss-parser.service';
import {ProxyModule} from './proxy/proxy.module';
import {ConfigModule} from "@nestjs/config";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Meta} from "./meta/meta.entity";
import {DataSource} from "typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            serveRoot: '/static',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async () => {
                const dataSource = new DataSource({
                    type: 'mysql',
                    host: process.env.MYSQL_HOST,
                    port: parseInt(process.env.MYSQL_PORT || '3306'),
                    username: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DB,
                    entities: [Meta],
                    synchronize: false,
                    logging: true,
                    ssl: {
                        ca: process.env.CA_CERTIFICATE.replace(/\\n/g, '\n')
                    },
                    poolSize: 1,
                    acquireTimeout: 10000
                })
                await dataSource.initialize();
                return dataSource.options;
            }
        }),
        TypeOrmModule.forFeature([Meta]),
        WidgetModule,
        OpenGraphModule,
        RssParserModule,
        ProxyModule,
    ],
    controllers: [
        //MetaController,
        OpenGraphController,
        FormatController,
        MockRestApiController,
        RssParserController,
    ],
    providers: [
        // MetaService,
        FormatService,
        MockRestApiService,
        OpenGraphService,
        RssParserService,
    ],
})
export class AppModule {
}
