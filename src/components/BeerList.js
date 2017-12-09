import React, {Component} from 'react';
import InputBox from './InputBox';

class BeerList extends Component {
    constructor(){
        super();
        this.state = {
            beers: ['bud','coors','pbr']
        }
    }

    render(){
        let list = this.state.beers.map((beer,i) => {
            return <h3 key={i}>{beer}</h3>
        })
        return (
            <div>
                {list}
            </div>
        )
    }

}

export default BeerList;
