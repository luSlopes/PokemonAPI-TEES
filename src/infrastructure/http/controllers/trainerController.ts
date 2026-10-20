import type { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTrainerUseCase } from '@application/useCases/createTrainerUseCase';
import { CapturePokemonUseCase } from '@application/useCases/capturePokemonUseCase';
import { GetTrainerTeamUseCase } from '@application/useCases/getTrainerUseCase';
import {
  capturePokemonBodySchema,
  createTrainerBodySchema,
  trainerIdParamsSchema,
} from '../schemas/trainerSchema';

export class TrainerController {
  constructor(
    private readonly createTrainerUseCase: CreateTrainerUseCase,
    private readonly capturePokemonUseCase: CapturePokemonUseCase,
    private readonly getTrainerTeamUseCase: GetTrainerTeamUseCase,
  ) {}

  create = async (req: FastifyRequest, reply: FastifyReply) => {
    const { name } = createTrainerBodySchema.parse(req.body);
    const trainer = await this.createTrainerUseCase.execute({ name });
    return reply.status(201).send(trainer);
  };

  capture = async (req: FastifyRequest, reply: FastifyReply) => {
    const { trainerId } = trainerIdParamsSchema.parse(req.params);
    const { pokemonName } = capturePokemonBodySchema.parse(req.body);
    const capture = await this.capturePokemonUseCase.execute({
      trainerId,
      pokemonName,
    });
    return reply.status(201).send(capture);
  };

  getTeam = async (req: FastifyRequest, reply: FastifyReply) => {
    const { trainerId } = trainerIdParamsSchema.parse(req.params);
    const team = await this.getTrainerTeamUseCase.execute(trainerId);
    return reply.status(200).send(team);
  };
}
