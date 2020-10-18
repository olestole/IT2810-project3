import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { client } from 'utils/client';
import { Header } from './components/Shared';
import { Provider } from 'react-redux';
import { store } from 'store/reducer';


import './App.css';
import Router from 'pages/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Router />
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
