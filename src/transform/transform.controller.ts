import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import axios from 'axios';
import { TransformService } from './transform.service';

@Controller('transform')
export class TransformController {
  constructor(private readonly transformService: TransformService) {}

  @Get()
  async fetchData(
    @Query('url') url: string,
    @Query('options') options: string = '',
    @Query('target') target: string = '',
    @Res() res: any,
  ): Promise<any> {
    if (!url) {
      throw new BadRequestException('URL is required');
    }

    const value = await this.transformService.parserValue({
      url,
      options,
      target,
    });

    if (!value) {
      return;
    }

    return res.redirect(value);
  }
}
