import type { IPokeApiGateway } from '@domain/gateway/IPokeApiGateway';
import { PokemonNotFoundError } from '@domain/errors/pokemonNotFoundError';
import type { PokedexPokemonOutput } from '../dto/pokedex.dto';
export class SearchPokemonUseCase {
  constructor(private readonly pokeApiGateway: IPokeApiGateway) {}

  async execute(name: string): Promise<PokedexPokemonOutput> {
    const pokemon = await this.pokeApiGateway.findPokemonByName(name);
    if (!pokemon) throw new PokemonNotFoundError(name);

    return {
      name: pokemon.name,
      types: pokemon.types,
      hp: pokemon.hp,
      imageUrl: pokemon.imageUrl,
    };
  }
}
