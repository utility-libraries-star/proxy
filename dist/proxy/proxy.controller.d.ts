import { ProxyService } from './proxy.service';
import { Response } from 'express';
export declare class ProxyController {
    private readonly proxyService;
    constructor(proxyService: ProxyService);
    proxy(url: string, clearCache: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
