import React, { Component } from 'react'
import Image from "../Image/Image"
import myData from "../../assets/file1.json"
import Sidebar from "../Sidebar/Sidebar"
import "./Collage.css"


export default class Collage extends Component {
    constructor(props) {
        super(props)
        this.image_refs = []
        this.result_data = myData;
        this.displaySidebar = false;
        this.currentArtist = null;
        this.state = {
            collage: true,
            showOverlay: false,
            index: -1,
            currentArtist: null
        }

        this.createCollage = this.createCollage.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.render = this.render.bind(this)
    }

    //need to be able to pass number of rows to collage element
    //created in order to set 
    createCollage() {
        this.image_refs = []
        this.collage = this.props.albumInfo.album_info.map((d, ind) => {
            let current_ref = React.createRef()
            this.image_refs.push(current_ref)
            return (<Image album_data={d} index={ind} showOverlay={this.state.showOverlay}
                clicked={false} key={ind} ref={current_ref} size={100 / this.props.cols} />)
        })
        return this.collage;
    }

    clickHandler() {
        this.forceUpdate();
    }

    componentDidUpdate() {
        //determine if any images are highlighted
        let image_info = this.image_refs.map((ref) => {
            let image = ref.current;
            return {
                overlay: image.state.clicked,
                artist: image.artist,
                album: image.album
            }
        })
        //if an image has the overlay
        let hasOverlay = image_info.findIndex((d) => {
            return d.overlay === true
        })
        if (hasOverlay !== -1) {
            this.displaySidebar = true
            this.currentArtist = image_info[hasOverlay].artist
            this.setState({
                index: hasOverlay,
                currentArtist: image_info[hasOverlay].artist
            })
        }
        else {
            this.displaySidebar = false
        }

    }


    render() {
        return (
            <div className="pageWrapper container bg-secondary col m-0 p-0">

                <div className="collage container justify-content-left align-top col-md-9 col-xs-6 m-0 p-0"
                    style={this.collage_style} onClick={this.clickHandler} id="collage" >
                    {this.createCollage()}
                </div>
                {this.displaySidebar ?
                    <Sidebar currentArtist={this.currentArtist} index={this.state.index}
                        artistData={this.props.albumInfo.album_info[this.state.index]}
                        imgArr={this.props.albumInfo.img_arr} />
                    :
                    <div className="sidebar bg-secondary col-md-3 col-sm-6 m-0 p-3" style={{ "position": "sticky", "top": "0" }}>
                        <h4>Click an album to get more information!</h4>
                    </div>
                }
            </div>
        )
    }
}
