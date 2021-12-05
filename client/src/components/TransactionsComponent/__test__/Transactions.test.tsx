import React from 'react';
import ReactDOM from 'react-dom';
import  Transactions  from '../Transactions';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WEBSOCKET_URL || '',
  options: {
    reconnect: true,
  }
});

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};



it("renders Transactions component without crashing", () => {
    
    const div = document.createElement("div");
    ReactDOM.render(
        <ApolloProvider client={client}>
    <Transactions />
    </ ApolloProvider >
    , div)
})