import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const TTL_SECONDS = 7200;
const REFRESH_INTERVAL = 3600;

@Injectable()
export class RssParserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async fetchRssData(url: string, clearCache = false): Promise<any> {
    const cacheKey = `rss:${url}`;
    const metaKey = `rss_meta:${url}`;

    if (!clearCache) {
      const cached = await this.cacheManager.get(cacheKey);
      const meta = (await this.cacheManager.get(metaKey)) as {
        updatedAt: number;
      } | null;

      if (cached) {
        const now = Date.now();
        const updatedAt = meta?.updatedAt || 0;
        const ageInSeconds = (now - updatedAt) / 1000;

        if (ageInSeconds > REFRESH_INTERVAL) {
          this.refreshInBackground(url, cacheKey, metaKey);
        }

        return cached;
      }
    }

    const fresh = await this.getFreshRss(url);
    await this.cacheManager.set(cacheKey, fresh, TTL_SECONDS);
    await this.cacheManager.set(
      metaKey,
      { updatedAt: Date.now() },
      TTL_SECONDS,
    );

    return fresh;
  }

  private async refreshInBackground(
    url: string,
    cacheKey: string,
    metaKey: string,
  ) {
    this.getFreshRss(url)
      .then(async (fresh) => {
        await this.cacheManager.set(cacheKey, fresh, TTL_SECONDS);
        await this.cacheManager.set(
          metaKey,
          { updatedAt: Date.now() },
          TTL_SECONDS,
        );
        console.log(`[rss] Updated in background: ${url}`);
      })
      .catch((err) => {
        console.warn(`[rss] Failed background refresh:`, err.message);
      });
  }

  private async getFreshRss(url: string): Promise<any> {
    const res = await axios.get(url);
    const xml = res.data;

    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(xml);

    const channel = parsed.rss?.channel;
    const items = (
      Array.isArray(channel?.item) ? channel.item : [channel?.item]
    ).map((item) => ({
      title: normalize(item.title),
      link: normalize(item.link),
      pubDate: normalize(item.pubDate),
      category: item.category,
      guid: normalize(item.guid),
      description: normalize(item.description),
      'post-id': normalize(item['post-id']),
    }));

    return {
      channel: {
        title: channel?.title || '',
        link: channel?.link || '',
        description: channel?.description || '',
        lastBuildDate: channel?.lastBuildDate || '',
        language: channel?.language || '',
        generator: channel?.generator || '',
        image: channel?.image || {},
        items,
      },
      paging: { cursor: items.length },
    };
  }
}

function normalize(value: any): string {
  if (typeof value === 'object' && value !== null && '#text' in value) {
    return value['#text'];
  }
  return typeof value === 'string' ? value : '';
}
