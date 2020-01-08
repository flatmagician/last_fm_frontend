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
            rowInput: null,
            colInput: null,
            duration: null,
            category: "albums"

        }
    }

    handleUsernameChange(e) {
        console.log(e.target.value)
        this.setState({
            username: e.target.value
        })
    }

    handleRowChange(e) {
        console.log(e.target.value)
        this.setState({
            rowInput: e.target.value
        })
    }

    handleColChange(e) {
        console.log(e.target.value)
        this.setState({
            colInput: e.target.value
        })
    }
    handleDurationChange(e) {
        console.log(e.target.value)
        this.setState({
            duration: e.target.value
        })
    }

    handleCategoryChange(e) {
        console.log(e.target.value)
        this.setState({
            category: e.target.value
        })
    }

    submit() {

    }

    render() {
        return (
            <div className="homepage align-self-center col-lg-6 col-md-7 flex-basis-50 col-sm-12 bg-primary">
                <h1>last.fm collage utility</h1>
                <div className="formWrapper row no-pad justify-content-center">
                    <h3 className="formHeader col-12">Create a Collage!</h3>
                    <div className="username col-md-5 col-sm-7 col-xs-12 m-1">
                        <label class="username_label">
                            <input type="text" className="form-control form-control-lg" name="username"
                                placeholder="last.fm Username:" value={this.state.username} onChange={this.handleUsernameChange} />
                        </label>
                    </div>
                    <div className="durationOptions col-md-5 col-sm-7 col-xs-12 m-1">
                        <select value={this.state.duration} onChange={this.handleDurationChange} required className="form-control form-control-lg form-secondary">
                            <option value="" disabled selected hidden>Select Duration</option>
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
                            <input type="text" className="form-control form-control-lg" name="rowInput" placeholder="Rows: (max 15)"
                                value={this.state.rowInput} onChange={this.handleRowChange} />
                        </div>
                        <div className="col-md-5 col-sm-7 col-xs-12 m-1">
                            <input type="text" className="form-control form-control-lg" name="colInput" placeholder="Cols: (max 15)"
                                value={this.state.colInput} onChange={this.handleColChange} />
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
                            onClick={() => this.props.getAlbumInfo(this.state.username, this.state.category, this.state.duration, this.state.rowInput, this.state.colInput)}>
                            Create Collage
                        </button>
                    </div>
                </div>
            </div >
        )
    }
}