import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import App from "./components/App_component/App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Inscription from "./components/Inscription_component/Inscription";


ReactDOM.render(
    <Router>
    <div>
        <Route path="/" exact component={App} />
        <Route path="/01" component={Inscription} />
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();