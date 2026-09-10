import fastify from "fastify";
import { api_url } from "./config";
import { InMemoryPokemonRepository } from "@infrastructure/database/inMemoryPokemon.repository";
import type { Pokemon } from "@domain/entities/pokemon";
import { pokemonRoutes } from "@infrastructure/http/routes/pokemon.routes";

const app = fastify({
  logger: true,
});

await app.register(pokemonRoutes, {
  prefix: api_url.pokemon,
});

app
  .listen({ port: 3000 })
  .then(() => console.log("Server up"))
  .catch((err) => console.error("Falha ao iniciar o servidor " + err));
