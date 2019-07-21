import React, { Component } from 'react'
import "./Homepage.css"

export default class Homepage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="homepage">
                <h1>last.fm collage utility</h1>
                <div className="formWrapper">
                    <div className="formHeader">Create a Collage!</div>
                    <div className="username">
                        <label>
                            <input type="text" name="name" placeholder="last.fm Username:" />
                        </label>
                    </div>
                    <div className="sizeOptions">
                        <div className="rows">
                            <input type="text" name="rowInput" placeholder="Rows: (max 15)" />
                        </div>
                        <div className="cols">
                            <input type="text" name="colInput" placeholder="Cols: (max 15)" />
                        </div>
                    </div>
                    <div className="categoryOptions">
                        <select required>
                            <option value="" disabled selected hidden>Select Category</option>
                            <option value="albums">Top Albums</option>
                            <option value="artists">Top Artists</option>
                            <option value="tracks">Top Tracks</option>
                        </select>
                    </div>
                    <div className="durationOptions">
                        <select required>
                            <option value="" disabled selected hidden>Select Duration</option>
                            <option value="overall">Overall</option>
                            <option value="7day">Last Week</option>
                            <option value="1month">Last Month</option>
                            <option value="3month">Last 3 Months</option>
                            <option value="6month">Last 6 Months</option>
                            <option value="12month">Last Year</option>
                        </select>
                    </div>
                    <div className="submit">
                        <button name="submissionButton" type="button">Create Collage</button>
                    </div>
                </div>
            </div>
        )
    }
}