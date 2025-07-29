import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MetaService } from './meta.service';
import { Prisma } from '@prisma/client';

@Controller('p')
export class MetaController {
  constructor(private readonly service: MetaService) {}

  @Post()
  async create(@Body() body: Prisma.MetaCreateInput, @Req() req: Request) {
    const data = await this.service.create(body);

    const forwardedProto =
      req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.get('host') || 'localhost:3000';
    const baseUrl = `${forwardedProto}://${host}`;

    return { link: `${baseUrl}/p/${data.id}` };
  }

  @Get(':id')
  async preview(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const data = await this.service.getById(id);
    if (!data) throw new NotFoundException();

    const ogUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const html = `
      <html lang="en">
        <head>
          <title>${escapeHtml(data.title)}</title>
          <meta property="og:title" content="${escapeHtml(data.title)}" />
          <meta property="og:description" content="${escapeHtml(data.description)}" />
          <meta property="og:image" content="${escapeHtml(data.image)}" />
          <meta property="og:url" content="${escapeHtml(ogUrl)}" />
        </head>
        <body>
          <p>Redirecting...</p>
          <script>
            setTimeout(() => {
              window.location.href = "${escapeJs(data.redirect)}";
            }, 100);
          </script>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }
}

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (m) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[m] || m;
  });
}

function escapeJs(str: string): string {
  return str.replace(/"/g, '\\"');
}
