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
        this.collage_style = { width: `${300 * this.n_cols}px` };
        this.state = {

        }
    }

    //need to be able to pass number of rows to collage element
    //created in order to set 
    createCollage() {
        return this.result_data.map((d, ind) => {
            return (<Image album_data={d} index={ind} />)
        })

    }

    render() {
        return (
            <div className="collage" style={this.collage_style}>
                {this.createCollage()}
            </div>
        )
    }
}
