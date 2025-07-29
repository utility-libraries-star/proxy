"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const format_controller_1 = require("./format/format.controller");
const format_service_1 = require("./format/format.service");
const mock_rest_api_controller_1 = require("./mock-rest-api/mock-rest-api.controller");
const mock_rest_api_service_1 = require("./mock-rest-api/mock-rest-api.service");
const widget_module_1 = require("./widget/widget.module");
const opengraph_module_1 = require("./opengraph/opengraph.module");
const opengraph_controller_1 = require("./opengraph/opengraph.controller");
const opengraph_service_1 = require("./opengraph/opengraph.service");
const rss_parser_module_1 = require("./rss-parser/rss-parser.module");
const rss_parser_controller_1 = require("./rss-parser/rss-parser.controller");
const rss_parser_service_1 = require("./rss-parser/rss-parser.service");
const proxy_module_1 = require("./proxy/proxy.module");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const meta_entity_1 = require("./meta/meta.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/static',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: +process.env.MYSQL_PORT,
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DB,
                entities: [meta_entity_1.Meta],
                synchronize: true,
                ssl: {
                    ca: process.env.CA_CERTIFICATE?.replace(/\\n/g, '\n')
                },
                logging: ['error', 'query', 'warn'],
            }),
            typeorm_1.TypeOrmModule.forFeature([meta_entity_1.Meta]),
            widget_module_1.WidgetModule,
            opengraph_module_1.OpenGraphModule,
            rss_parser_module_1.RssParserModule,
            proxy_module_1.ProxyModule,
        ],
        controllers: [
            opengraph_controller_1.OpenGraphController,
            format_controller_1.FormatController,
            mock_rest_api_controller_1.MockRestApiController,
            rss_parser_controller_1.RssParserController,
        ],
        providers: [
            format_service_1.FormatService,
            mock_rest_api_service_1.MockRestApiService,
            opengraph_service_1.OpenGraphService,
            rss_parser_service_1.RssParserService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map