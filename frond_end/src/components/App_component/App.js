import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bienvenue sur la plateforme pédagogique des STL de l'Université Pierre et Marie Curie </h1>
        </header>
        <p className="App-intro">
          Notre plateforme vous permettra d'accéder avec facilité à l'ensemble des supports de cours des UEs de la filière STL. 
        </p>
      </div>
    );
  }
}

export default App;
