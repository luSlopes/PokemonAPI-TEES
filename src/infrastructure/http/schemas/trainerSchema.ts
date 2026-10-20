import { z } from 'zod';

export const createTrainerBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'O nome é obrigatório')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
});

export const trainerIdParamsSchema = z.object({
  trainerId: z.string().uuid('trainerId deve ser um UUID válido'),
});

export const capturePokemonBodySchema = z.object({
  pokemonName: z.string().trim().min(1, 'pokemonName é obrigatório'),
});
