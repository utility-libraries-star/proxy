import { OpenGraphService } from './opengraph.service';
export declare class OpenGraphController {
    private readonly ogService;
    constructor(ogService: OpenGraphService);
    getOpenGraph(url: string, clearCache?: string): Promise<Record<string, string>>;
}
