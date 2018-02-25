import React, { Component } from 'react';
import AppHeader from '../App_component/AppHeader';
import './Inscription.css';

class Inscription extends Component {
    constructor(props) {
        super(props);
        this.state = {  email: "",
            pass: undefined,
            passConfirm: undefined,
            emailErrorMsg: "",
            passwordErrorMsg: "",
            confirmPasswordErrorMsg: "",
            generalErrorMsg: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log("handleSubmit");
        /*
        if(this.state.email && this.state.pass && this.state.passConfirm){
            console.log("champs remplis");
            this.setStatus({generalErrorMsg: "Champs remplis"});
        } else {
            console.log("champs manquant");
            this.setStatus({generalErrorMsg: "Veuillez remplir tous les champs."});
        }
        */
        alert('A name was submitted: ' + this.state.email + ' pass1: '+ this.state.pass + ' pass2 : '+this.state.passConfirm);
        event.preventDefault();
    }

    validateEmail(value) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    handleEmailChange(event) {
        console.log("handle email");
        let value = event.target.value
        if(value){
            if(this.validateEmail(value)){
                this.setState({emailErrorMsg: ""});
            } else {
                this.setState({emailErrorMsg: "L'adresse email n'est pas valide."});
            }
        } else {
            this.setState({emailErrorMsg: "Veuillez entrer une adresse email."});
        }
        this.setState({email: value})
    }

    validatePassword(value) {
        if (value.length < 8) return false;
        //...
        return true;
    }

    handlePasswordChange(event){
        console.log("handle password");
        let value = event.target.value;
        if(!value){
            this.setState({passwordErrorMsg:"Veuillez entrer un mot de passe."});
        } else if(this.validatePassword(value)){
            this.setState({passwordErrorMsg:""});
        } else {
            this.setState({passwordErrorMsg:"Le mot de passe n'est pas valide."});
        }
        this.setState({password: value});
    }

    validatePasswordConfirm(value){
        return value === this.state.password;
    }

    handleConfirmPasswordChange(event){
        console.log("handle confirm password");
        let value = event.target.value;
        if(!value){
            this.setState({confirmPasswordErrorMsg:"Veuillez confirmer le mot passe."});
        } else if(this.validatePasswordConfirm(value)){
            this.setState({confirmPasswordErrorMsg:""});
        } else {
            this.setState({confirmPasswordErrorMsg:"Le mot de passe est différent."});
        }
        this.setState({confirmPassword: value});
    }


    /*Le Rendu*/
    render() {
        return (
            <div>
                <AppHeader />
                <div className="SignUpForm">
                  <h1>Inscription</h1>
                  <br />
                  <p class="ErrorMessage">{this.state.generalErrorMsg}</p>
                  <form onSubmit={this.handleSubmit}>
                    <label class="Insc-label" for="email">Adresse email:</label>
                      <input
                          id="email"
                          type="text"
                          value={this.state.email}
                          onChange={this.handleEmailChange}
                          placeholder="john.doe@etu.upmc.fr"
                      />
                      <label className="ErrorMessage">{this.state.emailErrorMsg}</label>
                    <br />
                    <br />
                    <label class="Insc-label" for="pass">Mot de passe:</label>
                      <input
                          id="pass"
                          type="password"
                          value={this.state.pass}
                          onChange={this.handlePasswordChange}
                          placeholder="mot de passe"
                      />
                      <label className="ErrorMessage">{this.state.passwordErrorMsg}</label>
                    <br />
                    <br />
                    <label class="Insc-label" for="confirm">Confirmer le mot de passe:</label>
                      <input
                          id="confirm"
                          type="password"
                          value={this.state.passConfirm}
                          onChange={this.handleConfirmPasswordChange}
                          placeholder="mot de passe"
                      />
                      <label className="ErrorMessage">{this.state.confirmPasswordErrorMsg}</label>
                    <br />
                    <br />
                    <button type="submit" className="wideButton">
                      Valider
                    </button>
                  </form>
                </div>
            </div>
        );
    }
}

export default Inscription;
