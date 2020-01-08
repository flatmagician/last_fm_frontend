import React, { Component } from 'react'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <div onClick={this.props.goHome}>Home</div>
                {this.props.page === "collage"?
                    <div onClick={this.props.downloadImg}>Download Collage</div>
                    :
                    <div></div>
                }
            </nav>
        )
    }
}
