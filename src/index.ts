import fastify from "fastify";
import { api_url } from "./config";

const app = fastify({
  logger: true,
});

interface Pokemon {
  id: string;
  name: string;
  type: string;
  hp: number;
}

let pokemons: Pokemon[] = [
  { id: "1", name: "Bulbasaur", type: "Grass", hp: 45 },
  { id: "4", name: "Charmander", type: "Fire", hp: 39 },
  { id: "7", name: "Squirtle", type: "Water", hp: 44 },
];

app.get(`${api_url.pokemon}`, async (req, reply) => {
  const { type } = req.query;
  const pokemon_filtered = pokemons.filter(
    (value) => value.type.toLowerCase() === String(type).toLowerCase(),
  );

  if (pokemon_filtered.length > 0) {
    reply.status(200).send(pokemon_filtered);
  }

  reply.status(200).send(pokemons);
});

app.post(api_url.pokemon, async (req, reply) => {
  const { id, name, type, hp } = req.body;

  if (!id || !name || !type || !hp) {
    reply.status(401).send("Preencha todos os dados necessários");
  }

  const new_pokemon: Pokemon = {
    id: id,
    name: name,
    type: type,
    hp: hp,
  };

  pokemons.push(new_pokemon);
  reply.status(201).send(`Pokemon criado: ${new_pokemon.name}`);
});

app.delete(`${api_url.pokemon}/:id`, async (req, reply) => {
  const { id } = req.params;

  const deleted_pokemon = pokemons.find((p) => p.id === id);

  if (!deleted_pokemon) {
    reply.send("Pokemon não encontrado");
  }

  pokemons = pokemons.filter((p) => p.id !== id);
  reply
    .status(200)
    .send(`Pokemon deletado com sucesso:${deleted_pokemon!.name}`);
});

app
  .listen({ port: 3000 })
  .then(() => console.log("Server up"))
  .catch((err) => console.error("Falha ao iniciar o servidor " + err));
