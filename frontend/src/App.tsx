import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { client } from 'utils/client';
import { Header } from './components/Shared';
import { Provider } from 'react-redux';
import { store } from 'store/reducer';
import { Auth0Provider } from '@auth0/auth0-react';
import Router from 'pages/Router';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

function App() {
  console.log(process.env.AUTH0_DOMAIN);

  return (
    <ApolloProvider client={client}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN!}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
        // redirectUri={window.location.origin}
        redirectUri={'http://localhost:3000'}
      >
        <BrowserRouter>
          <Provider store={store}>
            <Header />
            <Router />
          </Provider>
        </BrowserRouter>
      </Auth0Provider>
    </ApolloProvider>
  );
}

export default App;
