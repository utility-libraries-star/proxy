import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
export declare class ProxyService {
    private cacheManager;
    private httpService;
    private readonly logger;
    constructor(cacheManager: Cache, httpService: HttpService);
    fetchWithCache(url: string, clearCache: boolean): Promise<{
        data: string;
        contentType?: string;
    }>;
}
