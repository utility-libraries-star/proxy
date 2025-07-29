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
exports.OpenGraphService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const jsdom_1 = require("jsdom");
const https = require("https");
const http = require("http");
let OpenGraphService = class OpenGraphService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async fetchHeadHtml(url) {
        return new Promise((resolve, reject) => {
            const lib = url.startsWith('https') ? https : http;
            lib
                .get(url, (res) => {
                if (res.statusCode !== 200) {
                    return reject(new Error(`Failed to load page: ${res.statusCode}`));
                }
                let buffer = '';
                res.on('data', (chunk) => {
                    const str = chunk.toString();
                    buffer += str;
                    const match = buffer.match(/<\/head>/i);
                    if (match) {
                        const idx = match.index + match[0].length;
                        const headHtmlRaw = buffer.slice(0, idx);
                        res.destroy();
                        return resolve(`<html>${headHtmlRaw}</html>`);
                    }
                });
                res.on('end', () => {
                    reject(new Error('No </head> found in HTML'));
                });
                res.on('error', (err) => reject(err));
            })
                .on('error', reject);
        });
    }
    extractOgData(html) {
        const dom = new jsdom_1.JSDOM(html);
        const metas = dom.window.document.querySelectorAll('meta');
        const ogData = {};
        metas.forEach((meta) => {
            const property = meta.getAttribute('property');
            const content = meta.getAttribute('content');
            if (property?.startsWith('og:') && content) {
                ogData[property] = content;
            }
        });
        return ogData;
    }
    async fetchOgData(url, clearCache = false) {
        const cacheKey = `og:${url}`;
        if (!clearCache) {
            const cached = await this.cacheManager.get(cacheKey);
            if (cached)
                return cached;
        }
        const headHtml = await this.fetchHeadHtml(url);
        const ogData = this.extractOgData(headHtml);
        await this.cacheManager.set(cacheKey, ogData, 7200);
        return ogData;
    }
};
exports.OpenGraphService = OpenGraphService;
exports.OpenGraphService = OpenGraphService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cache_manager_1.Cache])
], OpenGraphService);
//# sourceMappingURL=opengraph.service.js.map