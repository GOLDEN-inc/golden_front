import React from "react";
import { Switch, Route } from "react-router-dom";

//import components
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import Home from "./components/Home";
import Create from "./components/CreatePost/Create";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registrar" component={Signup} />
        <Route exact path="/create" component={Create} />
    </Switch>
);

export default Routes;
    