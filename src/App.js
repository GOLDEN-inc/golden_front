import React from "react";
import Store from "./store/store";
import { Provider } from "react-redux";

import Routes from "./routes";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";


library.add(fab, faUser);

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
