import type { Capture as PrismaCapture } from '@generated/prisma/client';
import type { Capture } from '@domain/entities/capture';

export const toDomainCapture = (row: PrismaCapture): Capture => ({
  id: row.id,
  trainerId: row.trainerId,
  pokemonName: row.pokemonName,
  types: row.types,
  hp: row.hp,
  imageUrl: row.imageUrl,
  capturedAt: row.capturedAt,
});
