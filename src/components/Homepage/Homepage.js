import React, { Component } from 'react'
import "./Homepage.css"

export default class Homepage extends Component {
    constructor(props) {
        super(props)

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleColChange = this.handleColChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            username: null,
            username_placeholder: "last.fm Username:",
            username_style: {
                color: "#888888"
            },
            rowInput: null,
            row_placeholder: "Rows: (max 15)",
            row_style: {
                color: "#888888"
            },
            colInput: null,
            col_placeholder: "Cols: (max 15)",
            col_style: {
                color: "#888888"
            },
            duration: null,
            duration_placeholder: "Select Duration",
            duration_style: {
                color: "#888888"
            },
            category: "albums",

        }
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value,
            username_style: {
                color: "#5A5A5A",
                "border-color": "rgb(206, 212, 218)"
            }
        })
    }

    handleRowChange(e) {
        this.setState({
            rowInput: e.target.value,
            row_style: {
                color: "#5A5A5A",
                "border-color": "rgb(206, 212, 218)"
            }
        })
    }

    handleColChange(e) {
        this.setState({
            colInput: e.target.value,
            col_style: {
                color: "#5A5A5A",
                "border-color": "rgb(206, 212, 218)"
            }
        })
    }
    handleDurationChange(e) {
        this.setState({
            duration: e.target.value,
            duration_style: {
                color: "#5A5A5A",
                "border-color": "rgb(206, 212, 218)"
            }
        })
    }

    handleCategoryChange(e) {
        this.setState({
            category: e.target.value
        })
    }

    submit() {
        if (this.state.username != null && this.state.category != null && this.state.duration != null && this.state.rowInput != null && this.state.colInput != null) {
            this.props.getAlbumInfo(this.state.username, this.state.category, this.state.duration, this.state.rowInput, this.state.colInput)
        }
        else {
            if (this.state.username == null) {
                this.setState({
                    username_placeholder: "Need to Enter Username",
                    username_style: {
                        "border-color": "rgb(241, 151, 155)",
                        "border-width": "medium"
                    }
                })
            }
            if (this.state.duration == null) {
                this.setState({
                    duration_placeholder: "Need to Select Duration",
                    duration_style: {
                        "color": "#888888",
                        "border-color": "rgb(241, 151, 155)",
                        "border-width": "medium"
                    }
                })
            }
            if (this.state.rowInput == null) {
                this.setState({
                    row_placeholder: "Need to Enter Rows",
                    row_style: {
                        "border-color": "rgb(241, 151, 155)",
                        "border-width": "medium"
                    }
                })
            }
            if (this.state.colInput == null) {
                this.setState({
                    col_placeholder: "Need to Enter Cols",
                    col_style: {
                        "border-color": "rgb(241, 151, 155)",
                        "border-width": "medium"
                    }
                })
            }
        }
    }

    render() {
        return (
            <div className="homepage align-self-center col-lg-6 col-md-7 flex-basis-50 col-sm-12 bg-primary">
                <h1>last.fm collage utility</h1>
                <div className="formWrapper row no-pad justify-content-center">
                    <h3 className="formHeader col-12">Create a Collage!</h3>
                    <div className="username col-md-5 col-sm-7 col-xs-12 m-1">
                        <label class="username_label">
                            <input type="text" className="form-control form-control-lg" name="username" style={this.state.username_style}
                                placeholder={this.state.username_placeholder} value={this.state.username} onChange={this.handleUsernameChange} />
                        </label>
                    </div>
                    <div className="durationOptions col-md-5 col-sm-7 col-xs-12 m-1">
                        <select value={this.state.duration} onChange={this.handleDurationChange} required className="form-control form-control-lg form-secondary" style={this.state.duration_style}>
                            <option value="" disabled selected hidden>{this.state.duration_placeholder}</option>
                            <option value="overall">Overall</option>
                            <option value="7day">Last Week</option>
                            <option value="1month">Last Month</option>
                            <option value="3month">Last 3 Months</option>
                            <option value="6month">Last 6 Months</option>
                            <option value="12month">Last Year</option>
                        </select>
                    </div>
                    <div className="sizeOptions col-12 row no-pad justify-content-center">
                        <div className="col-md-5 col-sm-7 col-xs-12 m-1">
                            <input type="text" className="form-control form-control-lg" name="rowInput" placeholder={this.state.row_placeholder}
                                value={this.state.rowInput} onChange={this.handleRowChange} style={this.state.row_style} />
                        </div>
                        <div className="col-md-5 col-sm-7 col-xs-12 m-1">
                            <input type="text" className="form-control form-control-lg" name="colInput" placeholder={this.state.col_placeholder}
                                value={this.state.colInput} onChange={this.handleColChange} style={this.state.col_style} />
                        </div>
                    </div>
                    {/* <div className="categoryOptions col-md-5 col-sm-7 col-xs-12 m-1">
                        <select value={this.state.category} onChange={this.handleCategoryChange} required className="form-control form-control-lg form-secondary" >
                            <option value="" disabled selected hidden>Select Category</option>
                            <option value="albums">Top Albums</option>
                            <option value="artists">Top Artists</option>
                            <option value="tracks">Top Tracks</option>
                        </select>
                    </div> */}
                    <div className="submit m-1 col-md-12 col-sm-12 col-xs-12">
                        <button name="submissionButton" type="button" className="btn btn-lg btn-secondary btn"
                            onClick={this.submit}>
                            Create Collage
                        </button>
                    </div>
                </div>
            </div >
        )
    }
}