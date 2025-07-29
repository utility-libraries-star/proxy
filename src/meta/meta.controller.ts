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

@Controller('p')
export class MetaController {
  constructor(private service: MetaService) {}

  @Post()
  async create(@Body() body: any, @Req() req: Request) {
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
    const data = await this.service.findById(id);
    if (!data) throw new NotFoundException();

    const html = `
          <html lang="en">
            <head>
              <title>${data.title}</title>
              <meta property="og:title" content="${data.title}" />
              <meta property="og:description" content="${data.description}" />
              <meta property="og:image" content="${data.image}" />
              <meta property="og:url" content="${req.protocol}://${req.get('host')}${req.originalUrl}" />
            </head>
            <body>
              <p>Redirecting...</p>
              <script>
                setTimeout(() => {
                  window.location.href = "${data.redirect}";
                }, 100);
              </script>
            </body>
          </html>
        `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }
}
