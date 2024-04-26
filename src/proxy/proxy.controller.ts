import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
};

@Controller('proxy')
export class ProxyController {
  @Get()
  async proxyRequest(@Query('url') url: string, @Res() res: Response) {
    if (!url) {
      throw new BadRequestException('URL is required');
    }

    try {
      const response = await axios.get(url, {
        responseType: 'stream',
        headers: HEADERS,
      });

      Object.entries({
        ...HEADERS,
        'Content-Type': response.headers['content-type'] || 'text/html',
      }).forEach(([key, value]) => {
        res.setHeader(key, value);
      });

      response.data.pipe(res);
    } catch (error) {
      res.status(error.response.status).send(error.response.statusText);
    }
  }
}
