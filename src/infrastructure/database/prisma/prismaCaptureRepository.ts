import type { PrismaClient } from '@generated/prisma/client';
import type { Capture } from '@domain/entities/capture';
import type {
  CreateCaptureData,
  ICaptureRepository,
} from '@domain/repositories/ICaptureRepository';
import { toDomainCapture } from './capture.mapper';

export class PrismaCaptureRepository implements ICaptureRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateCaptureData): Promise<Capture> {
    const row = await this.prisma.capture.create({ data });
    return toDomainCapture(row);
  }

  async findByTrainerId(trainerId: string): Promise<Capture[]> {
    const rows = await this.prisma.capture.findMany({
      where: { trainerId },
      orderBy: { capturedAt: 'asc' },
    });
    return rows.map(toDomainCapture);
  }

  async countByTrainerId(trainerId: string): Promise<number> {
    return this.prisma.capture.count({ where: { trainerId } });
  }
}
