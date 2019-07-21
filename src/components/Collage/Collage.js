import React, { Component } from 'react'
import Image from "../Image/Image"
import myData from "../../assets/file1.json"
import Sidebar from "../Sidebar/Sidebar"
import "./Collage.css"


export default class Collage extends Component {
    constructor(props) {
        super(props)
        this.n_rows = 3//props.n_rows;
        this.n_cols = 3//props.n_cols;
        this.image_refs = []
        this.result_data = myData;
        this.displaySidebar = false;
        this.currentArtist = null;
        this.collage_style = { "max-width": `${330 * this.n_cols}px` };
        this.state = {
            collage: true,
            showOverlay: false,

        }

        this.createCollage = this.createCollage.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.render = this.render.bind(this)
    }

    //need to be able to pass number of rows to collage element
    //created in order to set 
    createCollage() {
        this.image_refs = []
        this.collage = this.result_data.map((d, ind) => {
            let current_ref = React.createRef()
            this.image_refs.push(current_ref)
            return (<Image album_data={d} index={ind} showOverlay={this.state.showOverlay} clicked={false} key={ind} ref={current_ref} />)
        })
        return this.collage;
    }

    clickHandler() {
        this.forceUpdate();
    }

    componentDidUpdate() {
        //determine if any images are highlighted
        console.log("updated!")
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
            this.forceUpdate()
        }
        else {
            this.displaySidebar = false
        }

    }


    render() {
        return (
            <div className="pageWrapper">
                <div className="collage" style={this.collage_style} onClick={this.clickHandler} >
                    {this.createCollage()}
                </div>
                {this.displaySidebar ?
                    <Sidebar currentArtist={this.currentArtist} />
                    :
                    <div></div>
                }
            </div>
        )
    }
}
