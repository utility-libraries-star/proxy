import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class MetaService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.MetaCreateInput): Prisma.Prisma__MetaClient<{
        url: string;
        id: string;
        title: string;
        description: string;
        image: string;
        redirect: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    getById(id: string): Prisma.Prisma__MetaClient<{
        url: string;
        id: string;
        title: string;
        description: string;
        image: string;
        redirect: string;
        createdAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
