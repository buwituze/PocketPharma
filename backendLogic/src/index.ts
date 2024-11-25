import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express, { Application } from "express";
import cors from "cors";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { AppDataSource } from "./data-source";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

const PORT = process.env.PORT || 4000;

async function startServer(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");
 
    const app: Application = express();
  
    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true, 
      })
    );

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      persistedQueries: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }), 
      ],
      introspection: true,
      context: ({ req }) => {
        
        return { request: req };
      },
    });

    await server.start();
    server.applyMiddleware({
      app: app as any,
      cors: false,
    });

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Failed to start server:", (error as Error).message);
  }
}

startServer();