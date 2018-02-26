import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import ChatBot from 'react-simple-chatbot';
import AppHeader from './AppHeader';
import logo from '../../logo.svg';
import Calendar from '../Calendar_component/Calendar'

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
    /*ident correspondant au champs Identifiant*/
    this.state = { ident: undefined };
    /* mdp correspondant au champs Mot de passe*/
    this.state = { mdp : undefined};
    /* result correspondant à la réponse du serveur après validation*/
    this.state = { result : undefined};
    /* actions */
    this.handleChangeIdent = this.handleChangeIdent.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*action onChange pour le champs Identifiant */
  handleChangeIdent(event) {
    const v = (event.target.value)
    this.setState({ ident: v});
    
    console.log('name =' + this.state.ident + ' value = ' + v);
    console.log('Un identifiant = ' + this.state.ident);
    console.log('Un mot de passe = ' + this.state.mdp);
  }


  /*action onChange pour le champs Mot de passe */
  handleChangePass(event) {
    const v = (event.target.value)
    this.setState({ mdp: v});

    console.log('name =' + this.state.mdp + ' value = ' + v);
    console.log('Un identifiant = ' + this.state.ident);
    console.log('Un mot de passe = ' + this.state.mdp);
  }

  /*action onSubmit pour le bouton Submit */
  handleSubmit(event) {
    alert('Un identifiant = ' + this.state.ident+ " " + 'Un mot de passe = ' + this.state.mdp);
    var obj = '{'
       +'"id" :' +  this.state.ident 
       +'"mdp"  :' + this.state.mdp
       +'}';
       /*envoie au serveur*/
    event.preventDefault();
  }

  render() {
    return (
  <div className="App">
        <AppHeader/>
        <p className="App-intro">
          Notre plateforme vous permettra d'accéder avec facilité à l'ensemble des supports de cours des UEs de la filière STL.
        </p>


        <link rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
        <link rel="stylesheet" type="text/css"
		href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>




        <div class="container">
          <div class="jumbotron" id="jumbotron">
         <form class='form-signin' onSubmit={this.handleSubmit} >
				<h2 class="form-signin-heading">Login</h2>
				<input type='text' class='form-control' name='name' id='username'
					placeholder='Login' required='' autofocus=''  value={this.state.ident} onChange={this.handleChangeIdent} />
					
					<input
					type='password' class='form-control' name='name2' id='password'
					placeholder='Password' required=''value={this.state.mdp} onChange={this.handleChangePass} />
				<button class='btn btn-lg btn-primary btn-block' id='button'  type="submit" value="Submit" >Login</button>
			</form>
			 Vous n'avez pas de compte, Inscrivez vous ! 
            <NavLink to="/01" style={{ color: 'blue' }} activeStyle={{ color: 'red' }}>Inscription</NavLink>   
          
          
          
          
          
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
        <Calendar />
      </div>

    );
  }
}

export default App;
