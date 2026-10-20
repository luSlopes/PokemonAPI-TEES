import type { FastifyInstance } from 'fastify';
import type { TrainerController } from '../controllers/trainerController';

export const trainersRoutes =
  (controller: TrainerController) => async (app: FastifyInstance) => {
    app.post('/', controller.create);
    app.post('/:trainerId/captures', controller.capture);
    app.get('/:trainerId/team', controller.getTeam);
  };
