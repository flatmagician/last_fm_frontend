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
            showOverlay: this.props.showOverlay,
            clicked: this.props.clicked,
            stop: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //turn off unclicked overlays
        if (!this.state.clicked && this.state.showOverlay === true && !prevState.clicked) {
            this.setState(() => {
                return { showOverlay: false }
            })
        }

        //toggle clicked overlays
        else if (this.state.clicked) {
            this.setState(() => {
                return {
                    showOverlay: !this.state.showOverlay,
                    clicked: false
                }
            })
        }
    }

    handleClick = () => {
        // console.log(this.state.showOverlay)
        // console.log("click!")
        this.setState((state, props) => {
            return {
                clicked: true,
                stop: false
            };
        }
        )
    }

    render() {
        let elementId = this.state.showOverlay ? "overlay" : ""
        return (
            <div className="imgWrapper" id={this.index}>
                <div className="imgElement" id={elementId} onClick={this.handleClick}>
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