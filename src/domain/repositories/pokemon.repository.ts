import type { Pokemon } from '../entities/pokemon';

export interface IPokemonRepository {
  findPokemonById(id: string): Promise<Pokemon>;
  createPokemon(pokemon: Pokemon): Promise<Pokemon>;
  findAllPokemons(): Promise<Pokemon[]>;
  findAllByType(type: string): Promise<Pokemon[]>;
  deletePokemon(id: string): Promise<Pokemon>;
  updatePokemon(id: string, newData: Omit<Pokemon, 'id'>): Promise<Pokemon>;
}
