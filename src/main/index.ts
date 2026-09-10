import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { apiUrl } from './config/config';
import { pokemonRoutes } from '@infrastructure/http/routes/pokemon.routes';
import { pokemonSchema } from '@docs/swagger';

const app = fastify({
  logger: true,
});

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

app
  .listen({ port: 3000 })
  .then(() => console.log('Server up'))
  .catch((err) => console.error('Falha ao iniciar o servidor ' + err));
