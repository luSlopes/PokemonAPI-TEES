export class PokemonNotFoundError {
  private readonly message: string;
  private readonly httpStatus: number;

  constructor(message: string, httpStatus: number) {
    this.message = message;
    this.httpStatus = httpStatus;
  }
}
