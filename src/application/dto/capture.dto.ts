export type CapturePokemonInput = {
  trainerId: string;
  pokemonName: string;
};

export type CaptureOutput = {
  id: string;
  trainerId: string;
  pokemonName: string;
  types: string[];
  hp: number;
  imageUrl: string | null;
  capturedAt: Date;
};

export type TeamOutput = Omit<CaptureOutput, 'id' | 'trainerId' | 'capturedAt'>;
