import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./components/App";
import "./style/style.css";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([
  errorLink,
  new HttpLink({ uri: `http://localhost:4000/graphql` }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          songs: {
            read: (existing, { toReference, args }) => {
              const SongRef = toReference({
                __typename: "SongType",
              });
              return existing ?? SongRef;
            },
          },
        },
      },
    },
  }),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <App children={<SongList />}></App>
          </Route>
          <Route exact path="/songs/new">
            <App children={<SongCreate />}></App>
          </Route>
          <Route path="/songs/:id">
            <App children={<SongDetail />}></App>
          </Route>
        </Switch>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
