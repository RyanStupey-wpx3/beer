import React, {Component} from 'react';

class PourButton extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <button onClick={this.props.click}>Pour</button>
        )
    }
}

export default PourButton
