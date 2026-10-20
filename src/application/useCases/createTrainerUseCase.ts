import type { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import type { CreateTrainerInput, TrainerOutput } from '../dtos/trainer.dto';

export class CreateTrainerUseCase {
  constructor(private readonly trainerRepository: ITrainerRepository) {}

  async execute({ name }: CreateTrainerInput): Promise<TrainerOutput> {
    const trainer = await this.trainerRepository.create({ name: name.trim() });

    return {
      id: trainer.id,
      name: trainer.name,
      createdAt: trainer.createdAt,
    };
  }
}
