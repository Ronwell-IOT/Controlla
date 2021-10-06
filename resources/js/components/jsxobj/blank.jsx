import React, { Component } from 'react'

class Blank extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <React.Fragment>


            </React.Fragment>
         );
    }
}

export default Blank;
