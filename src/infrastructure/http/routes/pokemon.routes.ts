import type { FastifyPluginAsync } from "fastify";
import { InMemoryPokemonRepository } from "@infrastructure/database/inMemoryPokemon.repository";
import type { Pokemon } from "@domain/entities/pokemon";

const database = new InMemoryPokemonRepository();

export const pokemonRoutes: FastifyPluginAsync = async (app) => {
  ((app.get("/", async (req, reply) => {
    const { type } = req.query;
    if (type !== undefined) {
      try {
        const pokemons = database.findAllByType(type);
        reply.send(pokemons).status(200);
      } catch (err) {
        reply.status(404).send({
          error: err,
        });
      }
    }

    const pokemons = database.findAllPokemons();
    reply.send(pokemons).status(200);
  }),
  app.post("/", async (req, reply) => {
    const { id, name, type, hp } = req.body;

    const newPokemon: Pokemon = {
      id: id,
      name: name,
      type: type,
      hp: hp,
    };

    if (!id || !name || !type || !hp) {
      reply.status(401).send("Preencha todos os dados necessários");
    }

    let createdPokemon: Pokemon | null = null;

    try {
      createdPokemon = database.createPokemon(newPokemon);
    } catch (err) {
      reply.status(404).send({
        created: false,
        error: err,
      });
    }
    reply.status(201).send({
      created: true,
      createdPokemon: createdPokemon,
    });
  })),
    app.delete("/:id", async (req, reply) => {
      const { id } = req.params;

      let deletedPokemon: Pokemon | null = null;
      try {
        deletedPokemon = database.deletePokemon(id);
      } catch (err) {
        reply.status(404).send({
          deleted: false,
          error: err,
        });
      }
      reply.status(200).send({
        deleted: true,
        deletedPokemon: deletedPokemon,
      });
    }),
    app.put("/:id", async (req, reply) => {
      const { id } = req.params;
      const { name, type, hp } = req.body;

      if (!id || !name || !type || !hp) {
        reply.status(401).send("Preencha todos os dados necessários");
      }

      const newData: Omit<Pokemon, "id"> = {
        name: name,
        type: type,
        hp: hp,
      };

      let updatedPokemon: Pokemon | null = null;

      try {
        updatedPokemon = database.updatePokemon(id, newData);
      } catch (err) {
        reply.status(404).send({
          updated: false,
          message: "Pokemon não encontrado",
        });
      }
      reply.status(200).send({
        updated: true,
        updatedPokemon: updatedPokemon,
      });
    }));
};
