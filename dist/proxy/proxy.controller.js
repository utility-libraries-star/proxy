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
const http_proxy_middleware_1 = require("http-proxy-middleware");
const common_1 = require("@nestjs/common");
const proxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
    router: (req) => {
        return req.query.url;
    },
    onProxyReq: (proxyReq, req) => {
        const url = new URL(req.query.url);
        proxyReq.setHeader('host', url.host);
        proxyReq.setHeader('origin', url.origin);
    },
    ignorePath: true,
    changeOrigin: true,
});
let ProxyController = class ProxyController {
    get(req, res, next) {
        proxy(req, res, next);
    }
};
exports.ProxyController = ProxyController;
__decorate([
    (0, common_1.All)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProxyController.prototype, "get", null);
exports.ProxyController = ProxyController = __decorate([
    (0, common_1.Controller)('proxy')
], ProxyController);
//# sourceMappingURL=proxy.controller.js.map