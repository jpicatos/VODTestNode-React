import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Menu extends Component{
    constructor() {
        super();
        this.state = {
            session: false,
            sessionName: ''
        };
    }
    componentDidMount(){
        fetch('/api/session')
            .then(res => res.json())
            .then(data => {
                console.log(data.user);
                this.setState({
                    session: data.authenticated,
                    sessionName: data.user
                });
            });
    }
    render(){
        if(this.state.session){
            return (
                <div className="menu">
                    <span id="home" className="focused focusable"><Link to="/">Home</Link></span>
                    <div>
                        <span id="history" className="focusable"><Link to="/history">History</Link></span>
                        <span><p>Hi {this.state.sessionName}</p></span>
                        <span id="log" className="focusable"><a href="/logout">Exit</a></span>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="menu">
                    <span id="home" className="focused focusable"><Link to="/">Home</Link></span>
                    <div>
                        <span id="history" className="focusable"><Link to="/history">History</Link></span>
                        <span id="log" className="focusable"><Link to="/login">Enter</Link></span>
                    </div>
                </div>
            )
        }
        
    }
}

export default Menu;