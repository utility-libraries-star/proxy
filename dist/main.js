"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const expressApp = express();
let cachedServer;
async function handler(req, res, next) {
    if (!cachedServer) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        await app.init();
        cachedServer = expressApp;
    }
    return cachedServer(req, res, next);
}
//# sourceMappingURL=main.js.map