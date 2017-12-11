import React, {Component} from 'react';

const quoteList = ['Life is too short to drink bad beer.', 'Beauty is in the eye of the beer holder.', 'Beer. Now there\'s a temporary solution.', 'Beer makes me hoppy.', 'Life is brewtiful','Beer- Because you can\'t drink bacon.', 'Today\'s soup is beer.'];

class Quote extends Component {
    constructor(){
        super();
        this.state = {
            quote: 0
        }
    }

    componentDidMount(){
        setInterval(() => {
            this.setState({
                quote: Math.floor((Math.random() * 7))
            })
        }, 5000)
    }

    render(){
        return (
            <h3>{quoteList[this.state.quote]}</h3>
        )
    }

}

export default Quote;
