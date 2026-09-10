import type { FastifyPluginAsync } from 'fastify';
import { InMemoryPokemonRepository } from '@infrastructure/database/inMemoryPokemon.repository';
import type { Pokemon } from '@domain/entities/pokemon';
import {
  errorSchema,
  pokemonInputSchema,
  pokemonUpdateSchema,
} from '@docs/swagger';
import { DuplicatedPokemonError } from '@domain/errors/duplicatedPokemon.error';
import { PokemonNotFoundError } from '@domain/errors/pokemonNotFound.error';

const database = new InMemoryPokemonRepository();

export const pokemonRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    '/',
    {
      schema: {
        tags: ['Pokémon'],
        summary: 'Lista os pokémons do catálogo',
        querystring: {
          type: 'object',
          properties: {
            type: { type: 'string', description: 'Filtra por tipo' },
          },
        },
        response: {
          200: { type: 'array', items: { $ref: 'Pokemon#' } },
          404: errorSchema,
        },
      },
    },
    async (req, reply) => {
      const { type } = req.query;
      if (type !== undefined) {
        try {
          return reply.status(200).send(database.findAllByType(type));
        } catch (err) {
          return reply.status(404).send({
            error:
              err instanceof PokemonNotFoundError
                ? err.getMessage()
                : 'Pokémon não encontrado',
          });
        }
      }
      return reply.status(200).send(database.findAllPokemons());
    },
  );

  app.post<{ Body: Pokemon }>(
    '/',
    {
      schema: {
        tags: ['Pokémon'],
        summary: 'Adiciona um pokémon ao catálogo',
        body: pokemonInputSchema,
        response: {
          201: {
            type: 'object',
            required: ['created', 'createdPokemon'],
            properties: {
              created: { type: 'boolean' },
              createdPokemon: { $ref: 'Pokemon#' },
            },
          },
          400: errorSchema,
          404: errorSchema,
        },
      },
    },
    async (req, reply) => {
      try {
        const createdPokemon = database.createPokemon(req.body);
        return reply.status(201).send({ created: true, createdPokemon });
      } catch (err) {
        return reply.status(404).send({
          error:
            err instanceof DuplicatedPokemonError
              ? err.getMessage()
              : 'Não foi possível criar o pokémon',
        });
      }
    },
  );

  app.delete<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        tags: ['Pokémon'],
        summary: 'Remove um pokémon do catálogo',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'string' } },
        },
        response: {
          200: {
            type: 'object',
            required: ['deleted', 'deletedPokemon'],
            properties: {
              deleted: { type: 'boolean' },
              deletedPokemon: { $ref: 'Pokemon#' },
            },
          },
          404: errorSchema,
        },
      },
    },
    async (req, reply) => {
      try {
        const deletedPokemon = database.deletePokemon(req.params.id);
        return reply.status(200).send({ deleted: true, deletedPokemon });
      } catch (err) {
        return reply.status(404).send({
          error:
            err instanceof PokemonNotFoundError
              ? err.getMessage()
              : 'Pokémon não encontrado',
        });
      }
    },
  );

  app.put<{ Params: { id: string }; Body: Omit<Pokemon, 'id'> }>(
    '/:id',
    {
      schema: {
        tags: ['Pokémon'],
        summary: 'Atualiza um pokémon do catálogo',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'string' } },
        },
        body: pokemonUpdateSchema,
        response: {
          200: {
            type: 'object',
            required: ['updated', 'updatedPokemon'],
            properties: {
              updated: { type: 'boolean' },
              updatedPokemon: { $ref: 'Pokemon#' },
            },
          },
          400: errorSchema,
          404: errorSchema,
        },
      },
    },
    async (req, reply) => {
      try {
        const updatedPokemon = database.updatePokemon(req.params.id, req.body);
        return reply.status(200).send({ updated: true, updatedPokemon });
      } catch (err) {
        return reply.status(404).send({
          error: err instanceof Error ? err.message : 'Pokémon não encontrado',
        });
      }
    },
  );
};
