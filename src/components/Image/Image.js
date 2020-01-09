import React, { Component } from 'react'
import "./Image.css"
import question from './question-mark.png'

export default class image extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.addDefaultSrc = this.addDefaultSrc.bind(this);
        this.data = props.album_data;
        this.index = props.index;

        this.artist = this.data.artist.name
        this.album = this.data.name
        this.imageUrls = this.data.image
        this.imageUrls[3]["#text"] = "http" + this.imageUrls[3]["#text"].substring(5)
        console.log(this.imageUrl)
        this.playcount = this.data.playcount
        this.style = {
            "max-width": `${this.props.size}%`
        }
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

    addDefaultSrc(ev) {
        ev.target.src = question
    }

    render() {
        let elementId = this.state.showOverlay ? "overlay" : ""
        return (
            <div className="imgWrapper col-xs-6 m-0 p-0 container-fluid" style={this.style} id={this.index}>
                <div className="imgElement media" id={elementId} onClick={this.handleClick}>
                    <div className="imgText">
                        <p className="text-left m-0">Artist: {this.artist}</p>
                        <p className="text-left m-0">Album: {this.album}</p>
                        <p className="text-left m-0">Playcount: {this.playcount}</p>
                    </div>
                    <img src={this.imageUrls[3]["#text"]} onError={this.addDefaultSrc} alt="" style={{ "padding": "0" }} crossorigin="Anonymous"
                        className="albumImg img-fluid col-12"></img>
                </div>
            </div >
        )
    }
}


/* <button onClick={this.handleClick}>

</button> */