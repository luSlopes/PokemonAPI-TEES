import { type IPokemonRepository } from "@domain/repositories/pokemon.repository";
import { type Pokemon } from "@domain/entities/pokemon";
import { PokemonNotFoundError } from "@domain/errors/pokemonNotFound.error";
import { DuplicatedPokemonError } from "@domain/errors/duplicatedPokemon.error";

export class InMemoryPokemonRepository implements IPokemonRepository {
  private InMemoryDatabase: Pokemon[] = [
    //Mocking com alguns valores padrão
    { id: "1", name: "Bulbasaur", type: "Grass", hp: 45 },
    { id: "4", name: "Charmander", type: "Fire", hp: 39 },
    { id: "7", name: "Squirtle", type: "Water", hp: 44 },
  ];

  findPokemonById(id: string): Pokemon {
    const pokemon = this.InMemoryDatabase.find((pokemon) => pokemon.id === id);

    if (!pokemon) {
      throw new PokemonNotFoundError("Pokémon não encontrado", 404);
    }
    return pokemon;
  }

  createPokemon(pokemon: Pokemon): Pokemon {
    const { id } = pokemon;

    if (
      this.InMemoryDatabase.find((pokemon) => pokemon.id === id) !== undefined
    ) {
      throw new DuplicatedPokemonError(
        `Pokémon de id: ${id} já cadastrado no catálogo`,
        404,
      );
    }

    const oldLength = this.InMemoryDatabase.length;
    const newLenght = this.InMemoryDatabase.push(pokemon);

    if (newLenght === oldLength) {
      throw new Error("Pokemon não pode ser adicionado ao catálogo");
    }

    return pokemon;
  }

  findAllPokemons(): Pokemon[] {
    return this.InMemoryDatabase;
  }

  findAllByType(type: string): Pokemon[] {
    const filteredPokemons = this.InMemoryDatabase.filter(
      (pokemon) => pokemon.type === type,
    );

    if (filteredPokemons.length === 0) {
      throw new PokemonNotFoundError(
        "Nenhum pokemon deste tipo foi encontrado",
        404,
      );
    }

    return filteredPokemons;
  }

  deletePokemon(id: string): Pokemon {
    const deleted_pokemon = this.InMemoryDatabase.find(
      (pokemon) => pokemon.id === id,
    );

    if (!deleted_pokemon) {
      throw new PokemonNotFoundError("Pokemon não encontado", 404);
    }

    this.InMemoryDatabase = this.InMemoryDatabase.filter(
      (pokemon) => pokemon.id !== id,
    );
    return deleted_pokemon;
  }

  updatePokemon(id: string, newData: Omit<Pokemon, "id">): Pokemon {
    this.InMemoryDatabase = this.InMemoryDatabase.map((pokemon) => {
      return pokemon.id === id ? (pokemon = { id, ...newData }) : pokemon;
    });

    return this.findPokemonById(id);
  }
}
