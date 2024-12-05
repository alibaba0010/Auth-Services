import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
});
const authMiddleware = new ApolloLink((oparetion, forward) => {
  oparetion.setContext({
    headers: {
      accessToken: Cookies.get("access_token"),
      refreshToken: Cookies.get("refresh_token"),
    },
  });
  return forward(oparetion);
});
export const graphqlClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});
