import { Controller, Get, Query, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { Response } from 'express';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  async proxy(
    @Query('url') url: string,
    @Query('clear_cache') clearCache: string,
    @Res() res: Response
  ) {
    if (!url) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    try {
      const { data, contentType } = await this.proxyService.fetchWithCache(
        url,
        clearCache === '1'
      );

      console.log(data);

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', contentType || 'text/plain');

      res.send(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
