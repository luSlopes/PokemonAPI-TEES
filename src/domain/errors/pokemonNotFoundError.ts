import { AppError } from './appError';

export class PokemonNotFoundError extends AppError {
  constructor(name: string) {
    super(`Pokémon "${name}" não encontrado`, 404);
  }
}
