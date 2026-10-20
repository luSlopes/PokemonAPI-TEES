import type { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import type { ICaptureRepository } from '@domain/repositories/ICaptureRepository';
import { TrainerNotFoundError } from '@domain/errors/trainerNotFoundError';
import type { CaptureOutput, TeamOutput } from '../dto/capture.dto';

export class GetTrainerTeamUseCase {
  constructor(
    private readonly trainerRepository: ITrainerRepository,
    private readonly captureRepository: ICaptureRepository,
  ) {}

  async execute(trainerId: string): Promise<TeamOutput[]> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) throw new TrainerNotFoundError(trainerId);

    const captures = await this.captureRepository.findByTrainerId(trainerId);
    return captures.map((capture) => ({
      pokemonName: capture.pokemonName,
      types: capture.types,
      hp: capture.hp,
      imageUrl: capture.imageUrl,
    }));
  }
}
