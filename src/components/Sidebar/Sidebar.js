import React, { Component } from 'react'
import myData from "../../assets/file1.json"
import "./Sidebar.css"
import axios from "axios"
import cheerio from "cheerio"

export default class Sidebar extends Component {
    constructor(props) {
        super(props)

        this.collageData = myData;
        this.clickHandler = this.clickHandler.bind(this);
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
        this.getArtist().then(this.fetchData)
    }
    async getArtist() {
        if (this.props.currentArtist !== null) {
            let artistData = await this.collageData.find((d) => {
                return d.artist.name === this.props.currentArtist;
            })
            this.setState(() => {
                return { artistData: artistData }
            })
        }
    }

    clickHandler() {
        console.log("click")
        //this.fetchData()
    }

    async fetchData() {
        const result = await axios.get(`${'https://cors-anywhere.herokuapp.com/'}${this.state.artistData.artist.url}/+images/`)
        let $ = await cheerio.load(result.data);
        let links = await $('.image-list-item-wrapper a img')
        let imgUrl = links[0].attribs.src

        const wiki_result = await axios.get(`${'https://cors-anywhere.herokuapp.com/'}${this.state.artistData.artist.url}/+wiki/`)
        let $$ = await cheerio.load(wiki_result.data)
        let bio = await $$('.wiki-content p')
        console.log(bio)
        if (typeof bio === "undefined" || bio.length === 0) {
            return
        }
        let bioText = bio[0].children.map(d => {
            console.log("type", d.type)
            if (d.type !== "text") {
                if (d.type === "tag") {
                    if (typeof d.children[0] === "undefined") {
                        return `\t`
                    }
                    return d.children[0].data
                }
                else {
                    console.log(d.children[0].data)
                    return d.children[0].data
                }
            }
            else {
                return d.data
            }
        })
        bioText = bioText.reduce((prev, cur) => {
            if (cur !== undefined) {
                return prev + cur
            }
            else {
                return prev
            }
        }, "")

        this.setState(() => {
            return {
                imgUrl: imgUrl,
                bioText: bioText
            }
        })
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
                <div className="sidebar" onClick={this.clickHandler}>
                    <h1>{this.state.artistData.artist.name}</h1>
                    <h2>{this.state.artistData.name}</h2>
                    {
                        showImg ?
                            <img className="artistImage" src={this.state.imgUrl} alt={this.state.artistData.artist.name}></img>
                            :
                            <div></div>
                    }
                    <h2> Plays: {this.state.artistData.playcount}</h2>
                    <h2><a href={this.state.artistData.artist.url}> View on last.fm</a></h2>
                    {
                        this.state.bioText ?
                            <p className="bioText"> {this.state.bioText} </p>
                            :
                            <div></div>
                    }
                </div >
                :
                <div></div>
        )
    }
}
