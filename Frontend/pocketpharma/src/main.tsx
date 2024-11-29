import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.tsx";

const client = new ApolloClient({
  uri: "https://bd90-2c0f-fe30-43db-0-657f-a412-4317-d768.ngrok-free.app/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
