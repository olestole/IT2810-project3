import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { client } from 'utils/client';
import { Detail, Overview } from './pages';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Detail />
      </div>
    </ApolloProvider>
  );
}

export default App;
