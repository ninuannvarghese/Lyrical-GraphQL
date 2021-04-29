import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import SongList from "./components/SongList";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SongList />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
