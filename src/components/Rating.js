import React from 'react';

const Rating = (props) => {
    return (
        <div>
            <input
                type="range"
                max="5" min="1"
                onChange={props.change}
                value={props.val} />
            <br/>
            <i className={props.val > 0 ? 'fa fa-star yellow' : 'fa fa-star'}></i> &nbsp;
            <i className={props.val > 1 ? 'fa fa-star yellow' : 'fa fa-star'}></i> &nbsp;
            <i className={props.val > 2 ? 'fa fa-star yellow' : 'fa fa-star'}></i> &nbsp;
            <i className={props.val > 3 ? 'fa fa-star yellow' : 'fa fa-star'}></i> &nbsp;
            <i className={props.val > 4 ? 'fa fa-star yellow' : 'fa fa-star'}></i>
        </div>
    )
}

export default Rating
