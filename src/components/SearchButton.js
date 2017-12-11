import React from 'react';

const SearchButton = (props) => {
    return (
        <div>
            <button className="SearchButton" onClick={props.click}><i className="fa fa-search"></i></button>
        </div>
    )
}

export default SearchButton
