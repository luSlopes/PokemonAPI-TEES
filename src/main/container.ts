import { prisma } from '@infrastructure/database/prisma/client';

// Infra: repositórios e gateway
import { PrismaTrainerRepository } from '@infrastructure/database/prisma/prismaTrainerRepository';
import { PrismaCaptureRepository } from '@infrastructure/database/prisma/prismaCaptureRepository';
import { PokeApiGateway } from '@infrastructure/providers/pokeApiGateway';
// Application: use cases
import { SearchPokemonUseCase } from '@application/useCases/searchPokemonUseCase';
import { CreateTrainerUseCase } from '@application/useCases/createTrainerUseCase';
import { CapturePokemonUseCase } from '@application/useCases/capturePokemonUseCase';
import { GetTrainerTeamUseCase } from '@application/useCases/getTrainerUseCase';

import { PokedexController } from '@infrastructure/http/controllers/pokedexController';
import { TrainerController } from '@infrastructure/http/controllers/trainerController';

// Repositórios e gateway
const trainerRepository = new PrismaTrainerRepository(prisma);
const captureRepository = new PrismaCaptureRepository(prisma);
const pokeApiGateway = new PokeApiGateway();

// Use cases
const searchPokemonUseCase = new SearchPokemonUseCase(pokeApiGateway);
const createTrainerUseCase = new CreateTrainerUseCase(trainerRepository);
const capturePokemonUseCase = new CapturePokemonUseCase(
  trainerRepository,
  captureRepository,
  pokeApiGateway,
);
const getTrainerTeamUseCase = new GetTrainerTeamUseCase(
  trainerRepository,
  captureRepository,
);

// Controllers (instâncias que as rotas recebem)
export const pokedexController = new PokedexController(searchPokemonUseCase);
export const trainerController = new TrainerController(
  createTrainerUseCase,
  capturePokemonUseCase,
  getTrainerTeamUseCase,
);
