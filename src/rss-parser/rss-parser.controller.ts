import { Controller, Get, Query } from '@nestjs/common';
import { RssParserService } from './rss-parser.service';

@Controller('rss-parser')
export class RssParserController {
  constructor(private readonly rssService: RssParserService) {}

  @Get()
  async getRss(
    @Query('q') url: string,
    @Query('clear_cache') clearCache?: string
  ) {
    if (!url) {
      return { error: 'Missing required parameter: q (RSS URL)' };
    }

    const shouldClear = clearCache === '1' || clearCache === 'true';
    return this.rssService.fetchRssData(url, shouldClear);
  }
}
