import type { PrismaClient } from '@generated/prisma/client';
import type { Trainer } from '@domain/entities/trainer';
import type {
  CreateTrainerData,
  ITrainerRepository,
} from '@domain/repositories/ITrainerRepository';
import { toDomainTrainer } from './trainer.mapper';

export class PrismaTrainerRepository implements ITrainerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Trainer | null> {
    const row = await this.prisma.trainer.findUnique({ where: { id } });
    return row ? toDomainTrainer(row) : null;
  }

  async create(data: CreateTrainerData): Promise<Trainer> {
    const row = await this.prisma.trainer.create({ data });
    return toDomainTrainer(row);
  }
}
