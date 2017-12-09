import React from 'react';

const Rating = (props) => {
    return (
        <div>
            <input
                type="range"
                max="5" min="1"
                onChange={props.change} />
            <br/>
            <i className="fa fa-star"></i> &nbsp;
            <i className="fa fa-star"></i> &nbsp;
            <i className="fa fa-star"></i> &nbsp;
            <i className="fa fa-star"></i> &nbsp;
            <i className="fa fa-star"></i>
        </div>
    )
}

export default Rating
