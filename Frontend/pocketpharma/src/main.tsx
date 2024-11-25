import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.tsx";

// Set up Apollo Client with your GraphQL endpoint
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace with your actual endpoint
  cache: new InMemoryCache(),
  credentials: "include", // Optional, depending on your needs
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
