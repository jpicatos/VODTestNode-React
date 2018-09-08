import React, { Component } from 'react';
import { Route, Redirect, Link} from "react-router-dom";

class Register extends Component{
    constructor() {
        super();
        this.state = {
            name: '',
            pass1: '',
            pass2: '',
            errorMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
        console.log(this.state);
        
    }
    handleSubmit(event) {
        event.preventDefault();
        var jsonBody={
            name: this.state.name,
            pass1: this.state.pass1,
            pass2: this.state.pass2
        }
        var formBody = [];
        for (var property in jsonBody) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(jsonBody[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('/api/register', {
            method: "POST",
            body: formBody,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then((response) => {
            if (response.status === 401) {
              this.setState({errorMessage: 'Las contraseñas no coinciden'});
            }
            else if(response.status === 400){
                this.setState({errorMessage: 'Ya existe el nombre de usuario'});
            }
            else{
                window.location.replace('/#/login').reload();
            }
            console.log( response.status);
          })
    }
    render(){
        return (
            <div id="register">
                <h1>Register</h1>
                <p id='error'>{this.state.errorMessage}</p>
                <form id='registerForm' onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} id='user' className="field" type="text" name="name" placeholder='User' required/><br/>
                    <input onChange={this.handleChange} id='pass1' className="field" type="password" name="pass1" placeholder='Password' required/><br/>
                    <input onChange={this.handleChange} id='pass2' className="field" type="password" name="pass2" placeholder='Repeat Password' required/><br/>
                    <button className="formButton" type="submit">Register</button>
                    <h4>Do you have account? <Link to='/login'>Sign In!</Link></h4>
                </form>
            </div>
        )
    }
}

export default Register;