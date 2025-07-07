import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { JSDOM } from 'jsdom';
import * as https from 'https';
import * as http from 'http';

@Injectable()
export class OpenGraphService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private async fetchHeadHtml(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const lib = url.startsWith('https') ? https : http;

      lib
        .get(url, (res) => {
          if (res.statusCode !== 200) {
            return reject(new Error(`Failed to load page: ${res.statusCode}`));
          }

          let buffer = '';

          res.on('data', (chunk) => {
            const str = chunk.toString();
            buffer += str;

            const match = buffer.match(/<\/head>/i);
            if (match) {
              const idx = match.index! + match[0].length;
              const headHtmlRaw = buffer.slice(0, idx);
              res.destroy();
              return resolve(`<html>${headHtmlRaw}</html>`);
            }
          });

          res.on('end', () => {
            reject(new Error('No </head> found in HTML'));
          });

          res.on('error', (err) => reject(err));
        })
        .on('error', reject);
    });
  }

  private extractOgData(html: string): Record<string, string> {
    const dom = new JSDOM(html);
    const metas = dom.window.document.querySelectorAll('meta');
    const ogData: Record<string, string> = {};

    metas.forEach((meta) => {
      const property = meta.getAttribute('property');
      const content = meta.getAttribute('content');

      if (property?.startsWith('og:') && content) {
        ogData[property] = content;
      }
    });

    return ogData;
  }

  async fetchOgData(
    url: string,
    clearCache = false,
  ): Promise<Record<string, string>> {
    const cacheKey = `og:${url}`;

    if (!clearCache) {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached as Record<string, string>;
    }

    const headHtml = await this.fetchHeadHtml(url);
    const ogData = this.extractOgData(headHtml);

    await this.cacheManager.set(cacheKey, ogData, 7200); // 2 часа

    return ogData;
  }
}
