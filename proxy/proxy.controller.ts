import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  async fetchData(@Query('url') url: string): Promise<any> {
    if (!url) {
      throw new BadRequestException('URL is required');
    }

    try {
      return await this.proxyService.fetchDataFromUrl(url);
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
}
