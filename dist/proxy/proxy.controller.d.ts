import { Response } from 'express';
export declare class ProxyController {
    proxyRequest(url: string, res: Response): Promise<void>;
}
