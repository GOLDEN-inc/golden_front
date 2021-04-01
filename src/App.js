import React from "react";
import Store from "./store/store";
import {Provider} from "react-redux";

import Routes from "./routes";
import "./App.css";


function App() {
    return (
        <Provider store={Store}>
            <div className="App">
                <Routes/>
            </div>
        </Provider>
    );
}

export default App;
