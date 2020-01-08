import React, { Component } from 'react'

export default class Loading extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="spinner-border text-secondary align-self-center" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
}
