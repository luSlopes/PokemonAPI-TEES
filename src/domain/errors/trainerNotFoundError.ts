import { AppError } from './appError';

export class TrainerNotFoundError extends AppError {
  constructor(trainerId?: string) {
    super(
      trainerId
        ? `Treinador "${trainerId}" não encontrado`
        : 'Treinador não encontrado',
      404,
    );
  }
}
