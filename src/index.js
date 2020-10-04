import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./components/App";
import GlobalStyles from "./GlobalStyles";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <GlobalStyles />
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById("app")
);
