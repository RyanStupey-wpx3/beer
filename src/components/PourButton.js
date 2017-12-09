import React, {Component} from 'react';

class PourButton extends Component {
    render(){
        return (
            <button onClick={this.props.click}>Pour</button>
        )
    }
}

export default PourButton
