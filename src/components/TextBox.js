import React, {Component} from 'react';

class TextBox extends Component {
    render(){
        return (
            <div>
                <textarea onChange={this.props.onChange} placeholder={this.props.placeholder} className="Textarea" value={this.props.val}></textarea>
            </div>
        )
    }
}

export default TextBox
