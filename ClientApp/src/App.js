import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Log } from './components/Log';
import { User } from './components/User';
import { UserDetails } from './components/UserDetails';
import { CharRedirect } from './components/CharRedirect'; 
import { Admin } from './components/admin'; 
import { LoginForm } from './components/LoginForm'; 
import { ProtectedRoute } from './components/protected.route';




import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={LoginForm} />        
          <ProtectedRoute exact path='/home' component={Home} />        
          <ProtectedRoute exact path='/char/id' component={CharRedirect} />  
          <ProtectedRoute exact path='/user/id' component={UserDetails} />
          <ProtectedRoute exact path='/user' component={User} />
          <ProtectedRoute exact path='/log' component={Log} />
          <ProtectedRoute exact path='/login' component={LoginForm} />
          
          <Route path="*" component={() => "404 NOT FOUND"} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Layout>
    );
  }
}
