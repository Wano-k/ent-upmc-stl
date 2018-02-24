import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import logo from '../../logo.svg';
import ChatBot from 'react-simple-chatbot';

import PropTypes from 'prop-types';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      name2: '',
      gender: '',
     
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name,name2, gender } = steps;

    this.setState({ name, name2, gender});
  }

  render() {
    const { name,name2 ,gender } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Nom : </td>
              <td>{name.value} . {name2.value} @etu.upmc.com</td>
            </tr>
            <tr>
              <td>Vous etes  : </td>
              <td>{gender.value}</td>
            </tr>
         
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};



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
            <label>
              Mot de passe:
     <input type="password" value={this.state.pass} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          Vous n'avez pas de compte, Inscrivez vous ! <NavLink to="/01" style={{ color: 'blue' }} activeStyle={{ color: 'red' }}>Inscription</NavLink>
        
        <ChatBot
        
          floating={true}
          
           
          headerTitle="Chatbot Tutorial"
          recognitionEnable={true}
          steps={[
            {
              id: '1',
              message: 'Bonjour ! Bienvenu dans la plateforme pedagogique de l upmc.Cette plateforme permet pas mal de choses mais avant : ',
              trigger: '2',
            },
            {
              id: '2',
              message: "Quel est votre statut ? ",
              trigger: 'gender',
            },
            {
              id: 'gender',
               options: [
              { value: 'student', label: 'Student', trigger: 'student' },
              { value: 'teacher', label: 'Teacher', trigger: 'teacher' },
         
            ],
            },
            {
                id : 'student',
                message : "Ok parfait ! Vous etes etudiant,vous aurez acces a plusieurs services de consultations de cours (..),  Quel est votre prenom ? ",
                trigger  : 'name',
            },
            {
                id : 'name',
                user: true,
                trigger:'44',
            },
            {
                id : '44',
                message :"Ok, et votre nom ? ",
                trigger : "name2",
            },
            {
                id : 'name2',
                user : true,
                trigger : '4',
                
            },
            {
                id : '4',
                message : "Votre login est votre addresse mail étudiante,Vous pouvez vous inscrire a des cours, soumettre des devoirs,voir des offres d'entreprises. ",
                trigger : '5',
            },
            {
               id : '5' , 
               message : "Voici donc un petit récapitulatif : ",
               trigger : 'review'
            },
            
            {
                id : 'teacher',
                message : 'Ok,parfait!En tant qu enseignant vous pouvez creer des cours,ajouter des entreprises (..)',
                            
                trigger : 'fin',
            },
               {
               id : 'fin',
               user:true,
               trigger : '1',
               },
            {
                id : 'review',
                component: <Review />,
                  asMessage: true,
                trigger : 'fin',
            },
            
          
            
         
          ]}
  />
        </div>
      </div>

    );
  }
}

export default App;
