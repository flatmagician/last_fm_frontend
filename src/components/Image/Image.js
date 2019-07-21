import React, { Component } from 'react'
import "./Image.css"

export default class image extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.data = props.album_data;
        this.index = props.index;
        this.artist = this.data.artist.name
        this.album = this.data.name
        this.imageUrls = this.data.image
        this.playcount = this.data.playcount

        this.state = {

        }
    }

    handleClick = () => {
        console.log(this.artist, this.album, this.imageUrls, this.playcount)
    }

    render() {
        return (
            <div className="imgWrapper" id={this.index}>
                <div className="imgElement">
                    <div className="imgText">
                        <p>Artist: {this.artist}</p>
                        <p>Album: {this.album}</p>
                        <p>Playcount: {this.playcount}</p>
                    </div>
                    <img src={this.imageUrls[3]["#text"]} alt="" className="albumImg"></img>
                </div>
            </div>
        )
    }
}


/* <button onClick={this.handleClick}>

</button> */