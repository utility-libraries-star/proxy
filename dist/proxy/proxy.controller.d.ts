import { ProxyService } from './proxy.service';
export declare class ProxyController {
    private readonly proxyService;
    constructor(proxyService: ProxyService);
    fetchData(url: string): Promise<any>;
}
