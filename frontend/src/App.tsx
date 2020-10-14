import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { client } from 'utils/client';
import { Header } from './components/Shared';

import './App.css';
import Router from 'pages/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
