import type { Trainer } from '../entities/trainer';

export type CreateTrainerData = Pick<Trainer, 'name'>;

export interface ITrainerRepository {
  findById(id: string): Promise<Trainer | null>;
  create(data: CreateTrainerData): Promise<Trainer>;
}
