"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let appInstance;
async function handler(req, res) {
    if (!appInstance) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        await app.init();
        appInstance = app.getHttpAdapter().getInstance();
    }
    return appInstance(req, res);
}
//# sourceMappingURL=main.js.map