import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const certContent = process.env.SSL.replace(/\\n/g, '\n');
    if (certContent) {
      const certPath = join('/tmp', 'ca.pem');
      writeFileSync(certPath, certContent, 'utf-8');
    }
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}