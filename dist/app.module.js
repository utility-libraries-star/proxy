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
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const transform_controller_1 = require("./transform/transform.controller");
const transform_service_1 = require("./transform/transform.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
        ],
        controllers: [format_controller_1.FormatController, mock_rest_api_controller_1.MockRestApiController, transform_controller_1.TransformController],
        providers: [format_service_1.FormatService, mock_rest_api_service_1.MockRestApiService, transform_service_1.TransformService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map