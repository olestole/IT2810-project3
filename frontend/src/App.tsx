import React from 'react';
import { Detail, Overview } from './pages';
import { Header } from './components/Header';
import { ProductListView } from './components/ProductListView';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <ProductListView />
      </div>
    </div>
  );
}

export default App;
