import { createProxyMiddleware } from 'http-proxy-middleware';
import { All, Controller, Next, Req, Res } from '@nestjs/common';

const proxy = createProxyMiddleware({
  router: (req: any) => {
    return req.query.url as string;
  },
  onProxyReq: (proxyReq, req) => {
    const url = new URL(req.query.url as string);
    proxyReq.setHeader('host', url.host);
    proxyReq.setHeader('origin', url.origin);
  },
  ignorePath: true,
  changeOrigin: true,
} as unknown);

@Controller('proxy')
export class ProxyController {
  @All()
  get(@Req() req, @Res() res, @Next() next) {
    proxy(req, res, next);
  }
}
