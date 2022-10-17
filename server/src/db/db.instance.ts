import { PrismaClient } from '../../prisma/generated/client';

export const dbInstance = new PrismaClient();