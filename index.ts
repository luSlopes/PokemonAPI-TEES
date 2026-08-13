import fastify from "fastify";

const app = fastify({
  logger: true,
});

app.get("/", async (req, reply) => {
  //todo
  //todo
});

app.post("/", async (req, reply) => {
  //todo
});

app.delete("/", async (req, reply) => {
  //todo
});

app
  .listen({ port: 3000 })
  .then(() => console.log("Server up"))
  .catch((err) => console.error("Falha ao iniciar o servidor " + err));
