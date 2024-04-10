"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const HEADER = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
};
let TransformService = class TransformService {
    async parserValue({ url, options, target }) {
        const currentOptions = JSON.parse(decodeURIComponent(options) || '');
        const response = await axios_1.default.post(url, currentOptions, {
            headers: HEADER,
        });
        const responseData = response.data;
        const responseValue = responseData[target];
        if (!responseValue) {
            return;
        }
        return responseValue;
    }
};
exports.TransformService = TransformService;
exports.TransformService = TransformService = __decorate([
    (0, common_1.Injectable)()
], TransformService);
//# sourceMappingURL=transform.service.js.map