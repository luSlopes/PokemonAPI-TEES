import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { apiUrl } from './config/config';
import { pokemonRoutes } from '@infrastructure/http/routes/pokemon.routes';
import { pokemonSchema } from '@docs/swagger';
import { prisma } from '@infrastructure/database/prisma/client';
import { pokedexController, trainerController } from './container';
import { pokedexRoutes } from '@infrastructure/http/routes/pokedexRoutes';
import { trainersRoutes } from '@infrastructure/http/routes/trainerRoutes';
import { errorHandler } from '@infrastructure/http/middlewares/errorHandler';

const app = fastify({
  logger: true,
});

// Antes de registrar qualquer rota, para todas herdarem o handler
app.setErrorHandler(errorHandler);

await app.register(swagger, {
  openapi: {
    info: {
      title: 'Catalogo Pokemon API',
      description: 'Documentação da api',
      version: '1.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
});

app.addSchema(pokemonSchema);

await app.register(swaggerUi, {
  routePrefix: apiUrl.base + '/docs',
});

await app.register(pokemonRoutes, {
  prefix: apiUrl.pokemon,
});

// Passa as INSTÂNCIAS (minúsculas) montadas no container
await app.register(pokedexRoutes(pokedexController), {
  prefix: apiUrl.pokedex,
});
await app.register(trainersRoutes(trainerController), {
  prefix: apiUrl.trainers,
});

app.addHook('onClose', async () => {
  await prisma.$disconnect();
});

app
  .listen({ port: 3000, host: '0.0.0.0' })
  .then(() => console.log('Server up'))
  .catch((err) => console.error('Falha ao iniciar o servidor ' + err));
