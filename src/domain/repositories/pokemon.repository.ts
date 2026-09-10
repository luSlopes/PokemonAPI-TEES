import type { Pokemon } from "@domain/entities/pokemon";

export interface IPokemonRepository {
  findPokemonById(id: string): Pokemon;
  createPokemon(pokemon: Pokemon): Pokemon;
  findAllPokemons(): Pokemon[];
  deletePokemon(id: string): Pokemon;
  updatePokemon(id: string, newData: Omit<Pokemon, "id">): Pokemon;
}
