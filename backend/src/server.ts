import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/typeDefs';
import resolvers from './resolvers/index';

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app: app as any });
}

startApolloServer();

export default app;