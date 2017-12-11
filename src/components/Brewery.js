import React from 'react';

const Brewery = (props) => {

    let active = props.data.name ? '' : 'hidden';
    let est = props.data.established ? `<h3>Est ${props.data.established}</h3>` : '';
    
    return (
        <div className={active}>
            <h2>{props.data.name}</h2>
            {est}
            <p>{props.data.description}</p>
        </div>
    )

}

export default Brewery;
