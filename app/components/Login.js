import React, { Component } from 'react';
import { Route, Redirect, Link} from "react-router-dom";

class Login extends Component{
    constructor() {
        super();
        this.state = {
            name: '',
            pass: '',
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
            pass: this.state.pass
        }
        var formBody = [];
        for (var property in jsonBody) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(jsonBody[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('/api/login', {
            method: "POST",
            body: formBody,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then((response) => {
            if (response.status === 401) {
              this.setState({errorMessage: 'User/Pass incorrect'});
            }
            else{
                window.location.replace('/').reload();
            }
            console.log( response.status);
          })
    }
    render(){
        return (
            <div id="login">
                {console.log(this.state)}
                <h1>Login</h1>
                <p id='error'>{this.state.errorMessage}</p>
                <form onSubmit={this.handleSubmit} id='loginForm'>
                    <input onChange={this.handleChange} value={this.state.name}  id='user' className="field" type="text" name="name" placeholder='User' required/><br></br>
                    <input value={this.state.pass} onChange={this.handleChange} id='pass' className="field" type="password" name="pass" placeholder='Password' required/><br></br>
                    <button className="formButton" type="submit">Login</button>
                    <h4>Don't have account? <Link to='/register'>Sign Up Now!</Link></h4>
                </form>
                
            </div>
        )
    }
}

export default Login;