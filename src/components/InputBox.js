import React, {Component} from 'react';

class InputBox extends Component {
    render(){
        return (
            <div className="SearchBox">
                <input placeholder={this.props.placeholder} value={this.props.val} className="input" onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default InputBox
