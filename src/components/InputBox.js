import React from 'react';

const InputBox = (props) => {
    return (
        <input
            className="InputBox"
            placeholder={props.placeholder}
            value={props.val}
            onChange={props.onChange} />
    )
}

export default InputBox
