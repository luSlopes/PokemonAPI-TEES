import type { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import type { ICaptureRepository } from '@domain/repositories/ICaptureRepository';
import type { IPokeApiGateway } from '@domain/gateway/IPokeApiGateway';
import { MAX_TEAM_SIZE } from '@domain/constants';
import { TrainerNotFoundError } from '@domain/errors/trainerNotFoundError';
import { TeamFullError } from '@domain/errors/teamFullError';
import { PokemonNotFoundError } from '@domain/errors/pokemonNotFoundError';
import type { CapturePokemonInput, CaptureOutput } from '../dto/capture.dto';

export class CapturePokemonUseCase {
  constructor(
    private readonly trainerRepository: ITrainerRepository,
    private readonly captureRepository: ICaptureRepository,
    private readonly pokeApiGateway: IPokeApiGateway,
  ) {}

  async execute({
    trainerId,
    pokemonName,
  }: CapturePokemonInput): Promise<CaptureOutput> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) throw new TrainerNotFoundError(trainerId);

    const teamSize = await this.captureRepository.countByTrainerId(trainerId);
    if (teamSize >= MAX_TEAM_SIZE) throw new TeamFullError();

    const pokemon = await this.pokeApiGateway.findPokemonByName(pokemonName);
    if (!pokemon) throw new PokemonNotFoundError(pokemonName);

    const capture = await this.captureRepository.create({
      trainerId,
      pokemonName: pokemon.name,
      types: pokemon.types,
      hp: pokemon.hp,
      imageUrl: pokemon.imageUrl,
    });

    return { ...capture };
  }
}
