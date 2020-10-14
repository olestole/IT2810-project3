import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { client } from 'utils/client';
import { Detail, Overview, TemporaryPLW } from './pages';
import { Header } from './components/Shared';

import './App.css';
import Router from 'pages/Router';
import { BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Header />
        <Router />
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
