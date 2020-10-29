import React from 'react';
import { Header } from './components/Shared';
import { Provider } from 'react-redux';
import { store } from 'store/reducer';
import { Auth0Provider } from '@auth0/auth0-react';
import Router from 'pages/Router';
import { BrowserRouter } from 'react-router-dom';
import ApolloWrapper from 'utils/ApolloWrapper';
import { CustomToastContainer } from 'components/Shared/FeedbackToast';
import './App.css';

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      redirectUri={window.location.origin}
      scope="read:current_user update:current_user_metadata"
    >
      <ApolloWrapper>
        <BrowserRouter>
          <Provider store={store}>
            <CustomToastContainer />
            <Header />
            <Router />
          </Provider>
        </BrowserRouter>
      </ApolloWrapper>
    </Auth0Provider>
  );
}

export default App;
