import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Callback } from './Callback';
import Detail from './Detail';
import Login from './Login';
import Overview from './Overview/Overview';

const Router = () => (
  <div className="layout">
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/callback" component={Callback} />
      <Route path="/:id" component={Detail} />
      <Route exact path="/" component={Overview} />
    </Switch>
  </div>
);

export default Router;
