import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Carrousel extends Component{

    constructor() {
        super();
        this.state = {
            results: [],
        };
    }
    componentDidMount(){
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({results: data.entries});
            });
    }
    render(){
        return (
            <div className="total-carrousel">
                <button id="right" onClick={slide(0)} className="focusable"> {'<'} </button>
                <div className="carrousel">
                    <ul className="items">
                        { this.state.results.map(items =>{
                            return(
                                <li className="item focusable" key={items.id}>
                                    <Link to={"/" + items.id}>
                                        <div>
                                            <div className="thumbnail">
                                                <img src={items.images[0].url}></img>
                                            </div>
                                            <h2>{fetchTitle(items.title)}</h2>
                                            <h3>{items.categories[0].title} | {fetchType(items.type)} | {fetchLanguaje(items.metadata[0].value)}</h3>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })
                    }
                        
                    </ul>
                </div>
                <button id="left" onClick={slide(1)} className="focusable"> > </button>
            </div>
        )
    }
}

export default Carrousel;