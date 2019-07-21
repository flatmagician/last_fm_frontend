import React, { Component } from 'react'
import Image from "../Image/Image"
import myData from "./file1.json"
import "./Collage.css"


export default class Collage extends Component {
    constructor(props) {
        super(props)
        this.n_rows = props.n_rows;
        this.n_cols = props.n_cols;
        this.result_data = myData;
        this.collage_style = { width: `${330 * 3}px` };//{ width: `${330 * this.n_cols}px` };
        this.state = {
            collage: true,
            showOverlay: false
        }

        this.createCollage = this.createCollage.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.render = this.render.bind(this)
    }

    //need to be able to pass number of rows to collage element
    //created in order to set 
    createCollage() {
        this.collage = this.result_data.map((d, ind) => {
            return (<Image album_data={d} index={ind} showOverlay={this.state.showOverlay} clicked={false} />)
        })
        return this.collage;
    }

    clickHandler() {
        this.forceUpdate();
    }

    render() {
        return (
            <div className="collage" style={this.collage_style} onClick={this.clickHandler}>
                {this.createCollage()}
            </div>
        )
    }
}
