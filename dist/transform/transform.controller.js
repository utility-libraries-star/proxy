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
exports.TransformController = void 0;
const common_1 = require("@nestjs/common");
const transform_service_1 = require("./transform.service");
let TransformController = class TransformController {
    constructor(transformService) {
        this.transformService = transformService;
    }
    async fetchData(url, options = '', target = '', res) {
        if (!url) {
            throw new common_1.BadRequestException('URL is required');
        }
        const value = await this.transformService.parserValue({
            url,
            options,
            target,
        });
        if (!value) {
            return;
        }
        return res.redirect(value);
    }
};
exports.TransformController = TransformController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('url')),
    __param(1, (0, common_1.Query)('options')),
    __param(2, (0, common_1.Query)('target')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TransformController.prototype, "fetchData", null);
exports.TransformController = TransformController = __decorate([
    (0, common_1.Controller)('transform'),
    __metadata("design:paramtypes", [transform_service_1.TransformService])
], TransformController);
//# sourceMappingURL=transform.controller.js.map