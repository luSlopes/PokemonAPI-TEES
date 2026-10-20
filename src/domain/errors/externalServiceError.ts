// domain/errors/ExternalServiceError.ts
import { AppError } from './appError';

export class ExternalServiceError extends AppError {
  constructor(message = 'Falha ao consultar serviço externo') {
    super(message, 502);
  }
}
