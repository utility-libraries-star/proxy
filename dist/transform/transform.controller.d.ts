import { TransformService } from './transform.service';
export declare class TransformController {
    private readonly transformService;
    constructor(transformService: TransformService);
    fetchData(url: string, options: string, target: string, res: any): Promise<any>;
}
