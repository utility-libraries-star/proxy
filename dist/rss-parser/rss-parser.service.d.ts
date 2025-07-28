import { Cache } from 'cache-manager';
export declare class RssParserService {
    private cacheManager;
    constructor(cacheManager: Cache);
    fetchRssData(url: string, clearCache?: boolean): Promise<any>;
    private refreshInBackground;
    private getFreshRss;
}
