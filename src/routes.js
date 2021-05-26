import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import components
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import AboutUs from './components/AboutUs/AboutUs';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const Routes = () => (
  <Switch>
    <Route exact path="/entrar" component={Login} />
    <Route exact path="/registrar" component={Signup} />
    <Route exact path="/user/:golden" component={Profile} />
    <Route exact path="/" component={AboutUs} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route
      exact
      path="/reset-password/:resetPasswordToken"
      component={ResetPassword}
    />
  </Switch>
);

export default Routes;
