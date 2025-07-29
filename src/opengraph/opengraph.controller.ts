import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { OpenGraphService } from './opengraph.service';

@Controller('opengraph')
export class OpenGraphController {
  constructor(private readonly ogService: OpenGraphService) {}

  @Get()
  async getOpenGraph(
    @Query('url') url: string,
    @Query('clear_cache') clearCache?: string
  ) {
    if (!url) {
      throw new BadRequestException('Missing "url" parameter');
    }

    const clear = clearCache === 'true';
    return this.ogService.fetchOgData(url, clear);
  }
}
