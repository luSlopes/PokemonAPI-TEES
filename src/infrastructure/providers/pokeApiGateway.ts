import type {
  IPokeApiGateway,
  PokemonExternalData,
} from '@domain/gateway/IPokeApiGateway';
import { ExternalServiceError } from '@domain/errors/externalServiceError';
import type { PokeApiResponse } from './pokeApi.types';
import { toPokemonExternalData } from './pokeApi.mapper';

const BASE_URL = 'https://pokeapi.co/api/v2';
const TIMEOUT_MS = 5000;

export class PokeApiGateway implements IPokeApiGateway {
  async findPokemonByName(name: string): Promise<PokemonExternalData | null> {
    const normalized = encodeURIComponent(name.trim().toLowerCase());

    let res: Response;
    try {
      res = await fetch(`${BASE_URL}/pokemon/${normalized}`, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
    } catch {
      throw new ExternalServiceError('PokeAPI indisponível ou tempo esgotado');
    }

    if (res.status === 404) return null;

    if (!res.ok) {
      throw new ExternalServiceError(`PokeAPI retornou status ${res.status}`);
    }

    const data = (await res.json()) as PokeApiResponse;
    return toPokemonExternalData(data);
  }
}
