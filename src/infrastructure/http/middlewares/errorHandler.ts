import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { AppError } from '@domain/errors/appError';

export const errorHandler = (
  error: FastifyError | Error,
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: 'Dados inválidos',
      details: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ error: error.message });
  }

  // Erros do próprio fastify
  const statusCode = (error as FastifyError).statusCode;
  if (statusCode && statusCode < 500) {
    return reply.status(statusCode).send({ error: error.message });
  }

  req.log.error(error);
  return reply.status(500).send({ error: 'Erro interno do servidor' });
};
