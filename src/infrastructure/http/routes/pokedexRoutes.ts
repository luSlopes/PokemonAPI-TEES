import type { FastifyInstance } from 'fastify';
import type { PokedexController } from '../controllers/pokedexController';

export const pokedexRoutes =
  (controller: PokedexController) => async (app: FastifyInstance) => {
    app.get('/search', controller.search);
  };
