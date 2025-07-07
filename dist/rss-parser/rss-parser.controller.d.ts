import { RssParserService } from './rss-parser.service';
export declare class RssParserController {
    private readonly rssService;
    constructor(rssService: RssParserService);
    getRss(url: string, clearCache?: string): Promise<any>;
}
