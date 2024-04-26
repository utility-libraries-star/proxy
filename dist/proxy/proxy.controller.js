"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
};
let ProxyController = class ProxyController {
    async proxyRequest(url, res) {
        if (!url) {
            throw new common_1.BadRequestException('URL is required');
        }
        try {
            const response = await axios_1.default.get(url, {
                responseType: 'stream',
                headers: HEADERS,
            });
            Object.entries({
                ...HEADERS,
                'Content-Type': response.headers['content-type'] || 'text/html',
            }).forEach(([key, value]) => {
                res.setHeader(key, value);
            });
            response.data.pipe(res);
        }
        catch (error) {
            res.status(error.response.status).send(error.response.statusText);
        }
    }
};
exports.ProxyController = ProxyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('url')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "proxyRequest", null);
exports.ProxyController = ProxyController = __decorate([
    (0, common_1.Controller)('proxy')
], ProxyController);
//# sourceMappingURL=proxy.controller.js.map