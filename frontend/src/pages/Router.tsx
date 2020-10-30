import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Detail from './Detail';
import Profile from './Profile';
import Overview from './Overview';
import Callback from './Callback';

const Router = () => (
  <div className="layout">
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/callback" component={Callback} />
      <Route path="/:id" component={Detail} />
      <Route exact path="/" component={Overview} />
    </Switch>
  </div>
);

export default Router;
