import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import SignUp from "./components/SignUp";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </Router>
    );
}

export default App;
