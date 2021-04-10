import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import components
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import AboutUs from './components/AboutUs/AboutUs';

const Routes = () => (
  <Switch>
    <Route exact path="/entrar" component={Login} />
    <Route exact path="/registrar" component={Signup} />
    <Route exact path="/user/:golden" component={Profile} />
    <Route exact path="/" component={AboutUs} />
  </Switch>
);

export default Routes;
