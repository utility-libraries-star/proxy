import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { MetaService } from './meta.service';
import { Response, Request } from 'express';

@Controller('p')
export class MetaController {
  constructor(private service: MetaService) {}

  @Post()
  async create(@Body() body: any, @Req() req: Request) {
    const data = await this.service.create(body);

    const forwardedProto =
      req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.get('host');
    const baseUrl = `${forwardedProto}://${host}`;

    return { link: `${baseUrl}/p/${data.id}` };
  }

  @Get(':id')
  async preview(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const data = await this.service.findById(id);
    if (!data) throw new NotFoundException();

    const html = `
      <html>
        <head>
          <meta property="og:title" content="${data.title}" />
          <meta property="og:description" content="${data.description}" />
          <meta property="og:image" content="${data.image}" />
          <meta property="og:url" content="${data.url}" />
          <meta http-equiv="refresh" content="0; url=${data.redirect}" />
        </head>
        <body>
          <p>Redirecting...</p>
        </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }
}
