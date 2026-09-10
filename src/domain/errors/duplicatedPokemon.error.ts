export class DuplicatedPokemonError {
  private message: string;
  private httpStatus: number;

  constructor(message: string, httpStatus: number) {
    this.message = message;
    this.httpStatus = httpStatus;
  }
}
