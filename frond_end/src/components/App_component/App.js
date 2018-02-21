import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import Inscription from "../Inscription_component/Inscription";

const BaseLayout = () => (
  <div className="base">
    <header>
      <p>React Router v4 Browser Example</p>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/me'>Profile</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/contact'>Contact</Link></li>

        </ul>
      </nav>
    </header>
    <div className="container">
      <Route path="/" exact component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component="{RegisterPage}" />
      <Route path="/me" component={ProfilePage} />
    </div>
    <footer>
      React Router v4 Browser Example (c) 2017
    </footer>
  </div>
)
const HomePage = () => <div>This is a Home Page</div>
const LoginPage = () => <div>This is a Login Page</div>
const RegisterPage = () => <div>This is a Register Page</div>
const ProfilePage = () => <div>This is the Profile Page</div>
const AboutPage = () => <div>This is an About Page</div>
const ContactPage = () => <div>This is a Contact Page</div>
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
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Bienvenue sur la plateforme pédagogique des STL de l'Université Pierre et Marie Curie </h1>
      //   </header>
      //   <p className="App-intro">
      //     Notre plateforme vous permettra d'accéder avec facilité à l'ensemble des supports de cours des UEs de la filière STL.
      //    </p>
      //   <div>
      //     <form onSubmit={this.handleSubmit}>
      //       <label>
      //         Identifiant:
      //      <input type="text" value={this.state.value} onChange={this.handleChange} />
      //       </label>
      //       <br />
      //       <br />
      //       <label>
      //         Mot de passe:
      //      <input type="password" value={this.state.pass} />
      //       </label>
      //       <br />
      //       <br />

      //       <input type="submit" value="Submit" />
      //     </form>
      //   </div>
      // </div>


      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>

    );
  }
}

export default App;
