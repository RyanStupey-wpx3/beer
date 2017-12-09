import React, {Component} from 'react';

class InputBox extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="SearchBox">
                <input className="input" value={this.props.value} onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default InputBox
