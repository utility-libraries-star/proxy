import { Module } from '@nestjs/common';
import { RssParserService } from './rss-parser.service';
import { RssParserController } from './rss-parser.controller';

@Module({
  controllers: [RssParserController],
  providers: [RssParserService]
})
export class RssParserModule {}
