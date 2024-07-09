import { Controller, Get, Query, Res } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { Response } from 'express';

@Controller('widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get()
  getWidget(@Query('widgetId') widgetID: string, @Res() res: Response): void {
    const htmlContent = this.widgetService.getHtml(widgetID);
    res.send(htmlContent);
  }
}
