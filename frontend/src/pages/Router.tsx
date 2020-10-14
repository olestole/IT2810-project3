import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Detail from './Detail';
import Overview from './Overview';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Overview} />
      <Route path="/:id" component={Detail} />
    </Switch>
  );
};

export default Router;
