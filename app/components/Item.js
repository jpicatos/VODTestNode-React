import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Item extends Component{
    render(){
            return (
                <Link to={"/video/" + this.props.item.id}>
                    <div>
                        <div className="thumbnail">
                            <img src={this.props.item.images[0].url}></img>
                        </div>
                        <h2>{fetchTitle(this.props.item.title)}</h2>
                        <h3>{this.props.item.categories[0].title} | {fetchType(this.props.item.type)} | {fetchLanguaje(this.props.item.metadata[0].value)}</h3>
                    </div>
                </Link>
            )
    }
}

export default Item;