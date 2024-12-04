import { ApolloClient, InMemoryCache } from "@apollo/client";
console.log("Env", process.env.SERVER_URL);
export const graphqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
  cache: new InMemoryCache(),
});
