import React, { Component } from 'react';


class Carrousel extends Component{

    constructor() {
        super();
        this.state = {
            results: [],
        };
    }
    componentDidMount () {
        var link = '/api/video/' + this.props.match.params.video;

        fetch(link)
            .then(res => res.json())
            .then((results) => {
                this.setState({results: results})
            })
      }
    render(){
        return (
            <div>
                <div className="video-container">
                    <video id="video" src={this.state.results.videoUrl} autoPlay controls>
                    </video>
                </div>
                <div className="video-details">
                    <div id="video-image-thumbnail">
                        <img src={this.state.results.imageUrl} id="video-image"></img>
                    </div>
                    <div className="video-text">
                        <h1 id="video-title">{this.state.results.title}</h1>
                        <h4 id="video-data">{this.state.results.category} | {fetchLanguaje(this.state.results.lang)} | {fetchDate(this.state.results.accessDateTime)}</h4>
                        <p id="video-description">{this.state.results.description}</p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Carrousel;