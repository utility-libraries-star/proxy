import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MetaService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.MetaCreateInput) {
    return this.prisma.meta.create({ data });
  }

  getById(id: string) {
    return this.prisma.meta.findUnique({ where: { id } });
  }
}
