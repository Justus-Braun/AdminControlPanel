import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Log } from './components/Log';
import { User } from './components/User';
import { UserDetails } from './components/UserDetails';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user' component={User} />
          <Route exact path='/user/:id' component={UserDetails} />
          <Route exact path='/log' component={Log} />
        </Switch>
      </Layout>
    );
  }
}
