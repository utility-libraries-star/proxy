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
exports.MockRestApiController = void 0;
const common_1 = require("@nestjs/common");
const mock_rest_api_service_1 = require("./mock-rest-api.service");
let MockRestApiController = class MockRestApiController {
    constructor(mockRestApiService) {
        this.mockRestApiService = mockRestApiService;
    }
    async getData(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email is required');
        }
        return this.mockRestApiService.getDashboardLink(email);
    }
};
exports.MockRestApiController = MockRestApiController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MockRestApiController.prototype, "getData", null);
exports.MockRestApiController = MockRestApiController = __decorate([
    (0, common_1.Controller)('mock-rest-api'),
    __metadata("design:paramtypes", [mock_rest_api_service_1.MockRestApiService])
], MockRestApiController);
//# sourceMappingURL=mock-rest-api.controller.js.map