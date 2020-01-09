import React, { Component } from 'react'
import "./Sidebar.css"

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.fetchData = this.fetchData.bind(this);
        this.imgUrl = null
        this.state = {
            currentArtist: this.props.currentArtist,
            artistData: null,
            imgUrl: this.imgUrl,
            bioText: null
        }
        this.fetchData(this.props.index)
    }

    async fetchData(ind) {
        const result = this.props.imgArr
        let imgUrl = result[ind].imgUrl
        let bioText = result[ind].bioText
        this.state = {
            imgUrl: imgUrl,
            bioText: bioText,
            artistData: this.props.artistData
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentArtist !== this.props.currentArtist) {
            if (this.props.currentArtist === null) {
                this.setState({
                    currentArtist: this.props.currentArtist,
                    artistData: null,
                    imgUrl: null

                })
            }
            else {
                this.setState({
                    currentArtist: this.props.currentArtist,
                    imgUrl: null
                })
            }
        }
    }

    render() {
        let display = this.props.artistData ? true : false
        console.log(Object.prototype.toString.call(this.props.artistData))
        console.log(this.props.artistData)
        console.log(display)
        let showImg = this.state.imgUrl ? true : false
        return (
            display ?
                <div className="sidebar bg-secondary col-md-3 col-sm-6 m-0 p-3" style={{ "position": "sticky", "top": "0" }} onClick={this.clickHandler}>
                    <h3 className="col-xs-6">{this.props.artistData.artist.name}</h3>
                    <h4 className="col-xs-6">{this.props.artistData.name}</h4>
                    {
                        showImg ?
                            <img className="artistImage img-fluid" src={this.state.imgUrl} alt={this.props.artistData.artist.name}></img>
                            :
                            <div></div>
                    }
                    <h4 className="col-xs-6"> Plays: {this.props.artistData.playcount}</h4>
                    <h4 className="col-xs-6"><a href={this.props.artistData.artist.url}> View on last.fm</a></h4>
                    {
                        this.state.bioText ?
                            <p className="bioText col-xs-8"> {this.state.bioText} </p>
                            :
                            <div></div>
                    }
                </div >
                :
                <div></div>
        )
    }
}
