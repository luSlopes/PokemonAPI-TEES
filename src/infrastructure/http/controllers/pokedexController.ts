import type { FastifyReply, FastifyRequest } from 'fastify';
import { SearchPokemonUseCase } from '@application/useCases/searchPokemonUseCase';
import { searchPokedexQuerySchema } from '../schemas/pokedexSchema';

export class PokedexController {
  constructor(private readonly searchPokemonUseCase: SearchPokemonUseCase) {}

  // Erros lançados aqui (Zod, AppError) vão direto para o errorHandler global.
  search = async (req: FastifyRequest, reply: FastifyReply) => {
    const { name } = searchPokedexQuerySchema.parse(req.query);
    const pokemon = await this.searchPokemonUseCase.execute(name);
    return reply.status(200).send(pokemon);
  };
}
