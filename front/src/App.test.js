
import NoAccess from 'components/no-access.component';
import Home from 'home/views/home.view';
import Users from 'users/views/users.view';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3050/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

test('renders learn react link', () => {
  render(<NoAccess />);
  const alertElement = screen.getByText('No tienes acceso a este recurso');
  
  expect(alertElement).toBeInTheDocument();
});

test('testing home', () => {
  const history = createMemoryHistory();
  render(
    <ApolloProvider client={client}>
        <Router location={history.location} navigator={history}>
          <Routes>
              <Route index element={<Home/>} />
          </Routes>
        </Router>
    </ApolloProvider>
  );

  expect(screen.getByTestId('inicio')).toBeInTheDocument();
});

test('testing users', () => {
  const history = createMemoryHistory();
  render(
    <ApolloProvider client={client}>
        <Router location={history.location} navigator={history}>
          <Routes>
              <Route index element={<Users/>} />
          </Routes>
        </Router>
    </ApolloProvider>
  );

  const texttElement = screen.getByText('USUARIOS');
  
  expect(texttElement).toBeInTheDocument();
});