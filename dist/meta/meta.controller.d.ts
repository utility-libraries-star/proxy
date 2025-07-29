import { Request, Response } from 'express';
import { MetaService } from './meta.service';
export declare class MetaController {
    private service;
    constructor(service: MetaService);
    create(body: any, req: Request): Promise<{
        link: string;
    }>;
    preview(id: string, res: Response, req: Request): Promise<void>;
}
