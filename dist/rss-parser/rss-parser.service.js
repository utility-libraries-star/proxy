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
exports.RssParserService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const axios_1 = require("axios");
const fast_xml_parser_1 = require("fast-xml-parser");
const TTL_SECONDS = 7200;
const REFRESH_INTERVAL = 3600;
let RssParserService = class RssParserService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async fetchRssData(url, clearCache = false) {
        const cacheKey = `rss:${url}`;
        const metaKey = `rss_meta:${url}`;
        if (!clearCache) {
            const cached = await this.cacheManager.get(cacheKey);
            const meta = (await this.cacheManager.get(metaKey));
            if (cached) {
                const now = Date.now();
                const updatedAt = meta?.updatedAt || 0;
                const ageInSeconds = (now - updatedAt) / 1000;
                if (ageInSeconds > REFRESH_INTERVAL) {
                    this.refreshInBackground(url, cacheKey, metaKey);
                }
                return cached;
            }
        }
        const fresh = await this.getFreshRss(url);
        await this.cacheManager.set(cacheKey, fresh, TTL_SECONDS);
        await this.cacheManager.set(metaKey, { updatedAt: Date.now() }, TTL_SECONDS);
        return fresh;
    }
    async refreshInBackground(url, cacheKey, metaKey) {
        this.getFreshRss(url)
            .then(async (fresh) => {
            await this.cacheManager.set(cacheKey, fresh, TTL_SECONDS);
            await this.cacheManager.set(metaKey, { updatedAt: Date.now() }, TTL_SECONDS);
            console.log(`[rss] Updated in background: ${url}`);
        })
            .catch((err) => {
            console.warn(`[rss] Failed background refresh:`, err.message);
        });
    }
    async getFreshRss(url) {
        const res = await axios_1.default.get(url);
        const xml = res.data;
        const parser = new fast_xml_parser_1.XMLParser({ ignoreAttributes: false });
        const parsed = parser.parse(xml);
        const channel = parsed.rss?.channel;
        const items = (Array.isArray(channel?.item) ? channel.item : [channel?.item]).map((item) => ({
            title: normalize(item.title),
            link: normalize(item.link),
            pubDate: normalize(item.pubDate),
            category: item.category,
            guid: normalize(item.guid),
            description: normalize(item.description),
            'post-id': normalize(item['post-id'])
        }));
        return {
            channel: {
                title: channel?.title || '',
                link: channel?.link || '',
                description: channel?.description || '',
                lastBuildDate: channel?.lastBuildDate || '',
                language: channel?.language || '',
                generator: channel?.generator || '',
                image: channel?.image || {},
                items,
            },
            paging: { cursor: items.length },
        };
    }
};
exports.RssParserService = RssParserService;
exports.RssParserService = RssParserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], RssParserService);
function normalize(value) {
    if (typeof value === 'object' && value !== null && '#text' in value) {
        return value['#text'];
    }
    return typeof value === 'string' ? value : '';
}
//# sourceMappingURL=rss-parser.service.js.map