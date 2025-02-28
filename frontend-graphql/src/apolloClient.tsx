import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Création du lien HTTP vers le serveur GraphQL
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// Middleware pour ajouter le token dans l'Authorization
export const authLink = setContext((_, { headers }) => {
  // Récupère le token depuis le sessionStorage
  const token = sessionStorage.getItem("token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Création du client Apollo avec les liens configurés
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
