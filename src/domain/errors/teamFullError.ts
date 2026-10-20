import { AppError } from './appError';
import { MAX_TEAM_SIZE } from '../constants';

export class TeamFullError extends AppError {
  constructor() {
    super(`O time já possui o máximo de ${MAX_TEAM_SIZE} Pokémons`, 409);
  }
}
