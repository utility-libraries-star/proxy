"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_1 = require("http");
let server;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: false });
    await app.init();
    const instance = app.getHttpAdapter().getInstance();
    server = (0, http_1.createServer)(instance);
    return server;
}
if (require.main === module) {
    bootstrap().then((srv) => srv.listen(3000));
}
async function handler(req, res) {
    if (!server) {
        server = await bootstrap();
    }
    server.emit('request', req, res);
}
//# sourceMappingURL=main.js.map