import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class Carrousel extends Component{

    constructor() {
        super();
        this.state = {
            originalResults: [],
            results: [],
            session: false,
            sessionName: ''
        };
        this.onDeleteSingleClick = this.onDeleteSingleClick.bind(this);
        this.changeNumberOfElements = this.changeNumberOfElements.bind(this);
    }
    turnResults(results){
        var auxArray = [];
        var j = 0;
        for (let i = results.length - 1; i >= 0; i--) {
            auxArray[j] = results[i];
            j++;
        }
        return auxArray;
    }
    componentDidMount () {
        var link = '/api/history/'

        fetch(link)
            .then(res => res.json())
            .then((results) => {
                var auxResults = this.turnResults(results);
                this.setState({results: auxResults, originalResults: auxResults});
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
                var auxResults = this.turnResults(results);
                this.setState({results: auxResults, originalResults: auxResults});
                
            });
    }
    changeNumberOfElements(event){
        var items = event.target.value;
        var allItems = this.state.originalResults;
        if (items < 0 || allItems.length - items <= 0) {
            this.setState({results: allItems});
        }
        else{
            var auxArray = allItems.slice(0, items);
            this.setState({results: auxArray});
        }
    }
    render(){
        if(this.state.session){
            return (
                <div>
                    <div className='historyHeader'>
                        <h1>History</h1>
                        <div>
                        <form className='numberForm' onChange={this.changeNumberOfElements} method = "POST">
                            <select className='focusable' id='numberSelect' name ="number" required >
                                <option value="-1">All</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </form>
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