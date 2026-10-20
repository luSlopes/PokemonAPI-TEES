import { z } from 'zod';

export const searchPokedexQuerySchema = z.object({
  name: z.string().trim().min(1, 'O parâmetro "name" é obrigatório'),
});
