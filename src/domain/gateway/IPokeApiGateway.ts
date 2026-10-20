export type PokemonExternalData = {
  name: string;
  types: string[];
  hp: number;
  imageUrl: string | null;
};

export interface IPokeApiGateway {
  findPokemonByName(name: string): Promise<PokemonExternalData | null>;
}
