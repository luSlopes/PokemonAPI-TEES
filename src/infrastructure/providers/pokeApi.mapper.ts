import type { PokemonExternalData } from '@domain/gateway/IPokeApiGateway';
import type { PokeApiResponse } from './pokeApi.types';

export const toPokemonExternalData = (
  data: PokeApiResponse,
): PokemonExternalData => ({
  name: data.name,
  types: data.types.map((t) => t.type.name),
  hp: data.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 0,
  imageUrl:
    data.sprites.other?.['official-artwork']?.front_default ??
    data.sprites.front_default,
});
