export const pokemonSchema = {
  $id: "Pokemon",
  type: "object",
  required: ["id", "name", "type", "hp"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    hp: { type: "number" },
  },
} as const;

export const pokemonInputSchema = {
  type: "object",
  required: ["id", "name", "type", "hp"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    hp: { type: "number" },
  },
} as const;

export const pokemonUpdateSchema = {
  type: "object",
  required: ["name", "type", "hp"],
  properties: {
    name: { type: "string" },
    type: { type: "string" },
    hp: { type: "number" },
  },
} as const;

export const errorSchema = {
  type: "object",
  required: ["error"],
  properties: {
    error: { type: "string" },
  },
} as const;
