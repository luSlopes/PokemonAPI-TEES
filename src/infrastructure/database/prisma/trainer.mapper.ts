import type { Trainer as PrismaTrainer } from '@generated/prisma/client';
import type { Trainer } from '@domain/entities/trainer';

export const toDomainTrainer = (row: PrismaTrainer): Trainer => ({
  id: row.id,
  name: row.name,
  createdAt: row.createdAt,
});
