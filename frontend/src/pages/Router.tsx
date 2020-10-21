import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Callback } from './Callback';
import Detail from './Detail';
import Login from './Login';
import Overview from './Overview';

const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/callback" component={Callback} />
      <Route path="/:id" component={Detail} />
      <Route exact path="/" component={Overview} />
    </Switch>
  );
};

export default Router;
