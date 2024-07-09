import { WidgetService } from './widget.service';
import { Response } from 'express';
export declare class WidgetController {
    private readonly widgetService;
    constructor(widgetService: WidgetService);
    getWidget(widgetID: string, res: Response): void;
}
