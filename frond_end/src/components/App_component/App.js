import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    /*value correspondant au champs Identifiant*/
    this.state = { value: '' };

    /*A modifier: la var pour le mot de passe dans le this.state*/
    this.state = { pass: '' };

    /* actions */
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*action onChange pour le champs Identifiant */
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  /*action onSubmit pour le bouton Submit */
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  /*Le Rendu*/
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
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Identifiant:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br />
            <br />
            <label>
              Mot de passe:
          <input type="password" value={this.state.pass} />
            </label>
            <br />
            <br />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
