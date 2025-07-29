"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'log']
        });
        await app.listen(process.env.PORT || 3000);
        return app.getHttpServer();
    }
    catch (error) {
        console.error('Application startup error:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map