import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class Carrousel extends Component{

    constructor() {
        super();
        this.state = {
            results: [],
            session: false,
            sessionName: ''
        };
        this.onDeleteSingleClick = this.onDeleteSingleClick.bind(this);
    }
    componentDidMount () {
        var link = '/api/history/'

        fetch(link)
            .then(res => res.json())
            .then((results) => {
                this.setState({results: results});
            });
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
    onDeleteClick(event) {
        console.log(event.target.id);
        fetch('/api/history', {
            method: "DELETE"
          }).then((response) => {
            window.location.replace('/');
        })
    }
    onDeleteSingleClick(event) {
        console.log(event.target.id);
        var url = '/api/history/'+ event.target.id;
        fetch(url, {
            method: "DELETE"
          });
        var link = '/api/history/'
        fetch(link)
            .then(res => res.json())
            .then((results) => {
                console.log(this.state);
                this.setState({results: results});
                
            });
    }
    render(){
        if(this.state.session){
            return (
                <div>
                    <div className='historyHeader'>
                        <h1>History</h1>
                        <div>
                            <span onClick={this.onDeleteClick} id="deleteHistory" className="focusable"><i className="fa fa-trash" aria-hidden="true"></i><a> Delete history</a></span>
                        </div>
                    </div>
                    <div className="items">
                        <ul id="last_videos">
                        { this.state.results.map(item =>{
                                return(
                                    <li className="item focusable" key={item.itemId}>
                                        <span onClick={this.onDeleteSingleClick} className='deleteVideo' id={item.itemId}>
                                            X
                                        </span>                                   
                                        <Link to={"/video/" + item.itemId}>
                                            <div>
                                                <div className="thumbnail">
                                                    <img src={item.imageUrl}/>
                                                </div>
                                                <h2>{fetchTitle(item.title)}</h2>
                                                <h3>{item.category} | {fetchType(item.type)} | {fetchLanguaje(item.lang)}</h3>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                    
                </div>
            )
        }
        else{
            return (
                <div>
                    <div className='historyHeader'>
                        <h1>History</h1>
                    </div>
                    <div className="items">
                        <Link id='doLogin' to="/login"><span>Do login to have history</span></Link>
                    </div>
                </div>
            )
        }
    }
}

export default Carrousel;