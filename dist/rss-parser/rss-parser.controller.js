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
exports.RssParserController = void 0;
const common_1 = require("@nestjs/common");
const rss_parser_service_1 = require("./rss-parser.service");
let RssParserController = class RssParserController {
    constructor(rssService) {
        this.rssService = rssService;
    }
    async getRss(url, clearCache) {
        if (!url) {
            return { error: 'Missing required parameter: q (RSS URL)' };
        }
        const shouldClear = clearCache === '1' || clearCache === 'true';
        return this.rssService.fetchRssData(url, shouldClear);
    }
};
exports.RssParserController = RssParserController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('clear_cache')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RssParserController.prototype, "getRss", null);
exports.RssParserController = RssParserController = __decorate([
    (0, common_1.Controller)('rss-parser'),
    __metadata("design:paramtypes", [rss_parser_service_1.RssParserService])
], RssParserController);
//# sourceMappingURL=rss-parser.controller.js.map