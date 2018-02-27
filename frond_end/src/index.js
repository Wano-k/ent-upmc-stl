import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import App from "./components/App_component/App";
import Inscription from "./components/Inscription_component/Inscription";
import Calendar from "./components/Calendar_component/Calendar";


ReactDOM.render(
    <Router>
    <div>
        <Route path="/" exact component={App} />
        <Route path="/inscription" component={Inscription} />
        <Route path="/calendrier" component={Calendar} />
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();