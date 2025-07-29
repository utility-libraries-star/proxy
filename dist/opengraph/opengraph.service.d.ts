import { Cache } from '@nestjs/cache-manager';
export declare class OpenGraphService {
    private cacheManager;
    constructor(cacheManager: Cache);
    private fetchHeadHtml;
    private extractOgData;
    fetchOgData(url: string, clearCache?: boolean): Promise<Record<string, string>>;
}
