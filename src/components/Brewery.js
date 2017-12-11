import React from 'react';

const Brewery = (props) => {

    let active = props.data.name ? '' : 'hidden';
    let est = props.data.established ? `Est ${props.data.established}` : '';

    return (
        <div className={active}>
            <h2>{props.data.name}</h2>
            <h3>{est}</h3>
            <p>{props.data.description}</p>
        </div>
    )

}

export default Brewery;
