import React from 'react';

const DisplayResults = (props) => {
    return (
        <div className="DisplayResults">
            <h2>{props.name} <small>{props.abv}</small></h2>
            <h4><a href={props.website}>{props.brewery}</a></h4>
            <p>{props.description}</p>
            <img alt="" src={props.image} className="beerLabel" />
        </div>
    )
}

export default DisplayResults
