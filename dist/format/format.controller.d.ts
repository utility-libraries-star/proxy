import { FormatService } from './format.service';
export declare class FormatController {
    private readonly formatterService;
    constructor(formatterService: FormatService);
    formatData(parameters: any): Promise<any>;
}
