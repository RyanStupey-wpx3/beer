import React from 'react';

const TextBox = (props) => {
    return (
        <div>
            <textarea
                className="TextBox"
                onChange={props.onChange}
                placeholder={props.placeholder}
                value={props.val}></textarea>
        </div>
    )
}

export default TextBox
