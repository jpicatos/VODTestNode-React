import React, { Component } from 'react';

import Item from './Item';

class Carrousel extends Component{

    constructor() {
        super();
        this.state = {
            results: [],
            errored: false
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
    onItemClick(event) {
        console.log(event.target.id);
        if (event.target.id === 'right') {
            slide(0);
        }
        else{
            slide(1);
        } 
    }
    render(){
        return (
            <div className="total-carrousel">
                <button id="right" onClick={this.onItemClick} className="focusable"> {'<'} </button>
                <div className="carrousel">
                    <ul className="items">
                        { this.state.results.map(items =>{
                            return(
                                <li className="item focusable" key={items.id}>
                                    <Item item={items}/>
                                </li>
                            );
                        })
                    }
                        
                    </ul>
                </div>
                <button id="left" onClick={this.onItemClick} className="focusable"> > </button>
                
            </div>
        )
    }
}

export default Carrousel;