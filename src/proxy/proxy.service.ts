import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
  ) {}

  async fetchWithCache(
    url: string,
    clearCache: boolean,
  ): Promise<{ data: string; contentType?: string }> {
    const cacheKey = `proxy:${url}`;

    if (clearCache) {
      await this.cacheManager.del(cacheKey);
      this.logger.debug(`Cache cleared for ${url}`);
    } else {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) {
        this.logger.debug(`Serving from cache: ${url}`);
        return cached as any;
      }
    }

    this.logger.debug(`Fetching fresh data from ${url}`);
    const response = await lastValueFrom(
      this.httpService.get(url, { responseType: 'text' }),
    );

    const result = {
      data: response.data,
      contentType: response.headers['content-type'],
    };

    await this.cacheManager.set(cacheKey, result, 3600);

    return result;
  }
}
