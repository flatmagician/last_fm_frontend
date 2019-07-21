import React, { Component } from 'react'
import Image
import myData from "./file1.json"


export default class Collage extends Component {
    constructor(props) {
        super(props)
        this.n_rows = props.n_rows;
        this.n_cols = props.n_cols;
        this.album_data = myData;

        this.state = {

        }
    }

    createCollage() {
        this.album_data.map(

        )
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
