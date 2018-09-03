import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Menu extends Component{
    render(){
        return (
            <div className="menu">
                <span id="home" className="focused focusable"><Link to="/">Home</Link></span>
                <div>
                    <span id="history" className="focusable"><Link to="/history">History</Link></span>
                        <span><p>Hola</p></span>
                        <span id="log" className="focusable"><Link to="/logout">Exit</Link></span>
                        <span id="log" className="focusable"><Link to="/login">Enter</Link></span>
                </div>
            </div>
        )
    }
}

export default Menu;