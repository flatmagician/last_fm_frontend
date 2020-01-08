import React, { Component } from 'react'
import "./Sidebar.css"

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.getArtist = this.getArtist.bind(this);
        this.fetchData = this.fetchData.bind(this);
        //this.imgUrl = this.fetchData().then((d) => d)
        this.imgUrl = null
        this.state = {
            currentArtist: this.props.currentArtist,
            artistData: null,
            imgUrl: this.imgUrl,
            bioText: null
        }
        this.getArtist().then(this.fetchData(this.props.index))
    }
    async getArtist() {
        this.state.artistData = this.props.artistData;
        // this.setState(() => {
        //     return { artistData: this.props.artistData }
        // })
    }

    async fetchData(ind) {
        const result = this.props.imgArr
        let imgUrl = result[ind].imgUrl
        let bioText = result[ind].bioText
        console.log("artistData", this.props.artistData)
        this.state = {
            imgUrl: imgUrl,
            bioText: bioText,
            artistData: this.props.artistData
        }
        // this.setState(() => {
        //     return {
        //         imgUrl: imgUrl,
        //         bioText: bioText
        //     }
        // })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentArtist !== this.props.currentArtist) {
            if (this.props.currentArtist === null) {
                this.setState(() => {
                    return {
                        currentArtist: this.props.currentArtist,
                        artistData: null,
                        imgUrl: null
                    }
                })
            }
            else {
                this.setState(() => {
                    return {
                        currentArtist: this.props.currentArtist,
                        imgUrl: null
                    }
                })
            }
        }
    }

    //`${this.state.artistData.artist.url}/+images/`

    render() {
        let display = this.state.artistData ? true : false
        console.log(Object.prototype.toString.call(this.state.artistData))
        console.log(this.state.artistData)
        console.log(display)
        let showImg = this.state.imgUrl ? true : false
        return (
            display ?
                <div className="sidebar bg-secondary col-md-3 col-sm-6 m-0 p-3" style={{"position":"sticky", "top":"0"}} onClick={this.clickHandler}>
                    <h3 className="col-xs-6">{this.props.artistData.artist.name}</h3>
                    <h4 className="col-xs-6">{this.props.artistData.name}</h4>
                    {
                        showImg ?
                            <img className="artistImage img-fluid" src={this.state.imgUrl} alt={this.state.artistData.artist.name}></img>
                            :
                            <div></div>
                    }
                    <h4 className="col-xs-6"> Plays: {this.state.artistData.playcount}</h4>
                    <h4 className="col-xs-6"><a href={this.state.artistData.artist.url}> View on last.fm</a></h4>
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
