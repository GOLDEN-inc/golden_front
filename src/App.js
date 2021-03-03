import React, { useEffect, useState } from "react";
import Store from "./store/store";
import { Provider, useSelector } from "react-redux";

import firebase from "./firebase/config";
import Routes from "./routes";
import Nav from "./components/Nav";
import "./App.css";

function App() {
    return (
        <Provider store={Store}>
            <div className="App">
                <Routes />
            </div>
        </Provider>
    );
}

export default App;
