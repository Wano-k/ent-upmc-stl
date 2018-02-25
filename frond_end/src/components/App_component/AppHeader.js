import React, { Component } from "react";
import "./App.css";
import logo from '../../logo.svg';

class AppHeader extends Component {
    render(){
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Bienvenue sur la plateforme pédagogique des STL de l'Université Pierre et Marie Curie </h1>
            </header>
        )
    }
}

export default AppHeader;