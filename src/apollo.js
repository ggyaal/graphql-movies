import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://mysterious-basin-58176.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default client;
