import { Request, Response } from 'express';
import { MetaService } from './meta.service';
import { Prisma } from '@prisma/client';
export declare class MetaController {
    private readonly service;
    constructor(service: MetaService);
    create(body: Prisma.MetaCreateInput, req: Request): Promise<{
        link: string;
    }>;
    preview(id: string, res: Response, req: Request): Promise<void>;
}
