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
exports.MetaController = void 0;
const common_1 = require("@nestjs/common");
const meta_service_1 = require("./meta.service");
let MetaController = class MetaController {
    constructor(service) {
        this.service = service;
    }
    async create(body, req) {
        const data = await this.service.create(body);
        const forwardedProto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
        const host = req.get('host') || 'localhost:3000';
        const baseUrl = `${forwardedProto}://${host}`;
        return { link: `${baseUrl}/p/${data.id}` };
    }
    async preview(id, res, req) {
        const data = await this.service.findById(id);
        if (!data)
            throw new common_1.NotFoundException();
        const html = `
          <html lang="en">
            <head>
              <meta property="og:title" content="${data.title}" />
              <meta property="og:description" content="${data.description}" />
              <meta property="og:image" content="${data.image}" />
              <meta property="og:url" content="${req.protocol}://${req.get('host')}${req.originalUrl}" />
              <meta http-equiv="refresh" content="0; url=${data.redirect}" />
            </head>
            <body>
              <p>Redirecting...</p>
            </body>
          </html>
        `;
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    }
};
exports.MetaController = MetaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MetaController.prototype, "preview", null);
exports.MetaController = MetaController = __decorate([
    (0, common_1.Controller)('p'),
    __metadata("design:paramtypes", [meta_service_1.MetaService])
], MetaController);
//# sourceMappingURL=meta.controller.js.map