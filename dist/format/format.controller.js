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
exports.FormatController = void 0;
const common_1 = require("@nestjs/common");
const format_service_1 = require("./format.service");
const axios_1 = require("axios");
let FormatController = class FormatController {
    constructor(formatterService) {
        this.formatterService = formatterService;
    }
    async formatData(parameters) {
        const { url, ...otherParameters } = parameters;
        if (!url) {
            throw new common_1.BadRequestException('URL is required');
        }
        try {
            const response = await axios_1.default.get(url);
            const responseData = response.data;
            const formattedData = {};
            if (!parameters.startValue) {
                formattedData.startValue = '0';
            }
            Object.entries(otherParameters).forEach(([key, value]) => {
                const parseValue = value.slice(1, -1).split(', ');
                const isArray = Array.isArray(parseValue);
                const formattedValue = isArray
                    ? this.formatterService.getValueByArray(responseData, parseValue)
                    : this.formatterService.getValue(responseData, value);
                formattedData[key] = String(formattedValue);
            });
            return formattedData;
        }
        catch (error) {
            throw new Error('Failed to format data');
        }
    }
};
exports.FormatController = FormatController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FormatController.prototype, "formatData", null);
exports.FormatController = FormatController = __decorate([
    (0, common_1.Controller)('format'),
    __metadata("design:paramtypes", [format_service_1.FormatService])
], FormatController);
//# sourceMappingURL=format.controller.js.map