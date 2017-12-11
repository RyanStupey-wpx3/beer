import React from 'react';

const Button = (props) => <button className={`Button ${props.class}`} onClick={props.click}>{props.text}</button>;

export default Button
