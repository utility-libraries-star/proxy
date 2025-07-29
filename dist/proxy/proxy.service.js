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
var ProxyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let ProxyService = ProxyService_1 = class ProxyService {
    constructor(cacheManager, httpService) {
        this.cacheManager = cacheManager;
        this.httpService = httpService;
        this.logger = new common_1.Logger(ProxyService_1.name);
    }
    async fetchWithCache(url, clearCache) {
        const cacheKey = `proxy:${url}`;
        if (clearCache) {
            await this.cacheManager.del(cacheKey);
            this.logger.debug(`Cache cleared for ${url}`);
        }
        else {
            const cached = await this.cacheManager.get(cacheKey);
            if (cached) {
                this.logger.debug(`Serving from cache: ${url}`);
                return cached;
            }
        }
        this.logger.debug(`Fetching fresh data from ${url}`);
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, { responseType: 'text' }));
        const result = {
            data: response.data,
            contentType: response.headers['content-type'],
        };
        await this.cacheManager.set(cacheKey, result, 3600);
        return result;
    }
};
exports.ProxyService = ProxyService;
exports.ProxyService = ProxyService = ProxyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], ProxyService);
//# sourceMappingURL=proxy.service.js.map