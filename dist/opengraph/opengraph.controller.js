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
exports.OpenGraphController = void 0;
const common_1 = require("@nestjs/common");
const opengraph_service_1 = require("./opengraph.service");
let OpenGraphController = class OpenGraphController {
    constructor(ogService) {
        this.ogService = ogService;
    }
    async getOpenGraph(url, clearCache) {
        if (!url) {
            throw new common_1.BadRequestException('Missing "url" parameter');
        }
        const clear = clearCache === 'true';
        return this.ogService.fetchOgData(url, clear);
    }
};
exports.OpenGraphController = OpenGraphController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('url')),
    __param(1, (0, common_1.Query)('clear_cache')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OpenGraphController.prototype, "getOpenGraph", null);
exports.OpenGraphController = OpenGraphController = __decorate([
    (0, common_1.Controller)('opengraph'),
    __metadata("design:paramtypes", [opengraph_service_1.OpenGraphService])
], OpenGraphController);
//# sourceMappingURL=opengraph.controller.js.map