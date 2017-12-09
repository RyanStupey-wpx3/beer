import React, {Component} from 'react';
import axios from 'axios';
import InputBox from './InputBox';
import PourButton from './PourButton';

class BeerList extends Component {
    constructor(){
        super();
        this.state = {
            userInput: '',
            beers: []
        }
    }

    componentDidMount(){
        axios.get( `http://localhost:3535/api/mybeers` )
        .then( response => { this.setState({ beers: response.data }) }).catch(err => console.log('Error: ' + err));
    }

    updateInput(val){
        this.setState({ userInput: val })
    }

    addBeer(){
        this.setState({ userInput: '', beers: [...this.state.beers, this.state.userInput]});
    }

    updateBeer(){
        console.log('update');
    }

    render(){
        let list = this.state.beers.map((beer,i) => {
            if(this.state.beers.length > 1 && i > 0){
                return <h3 key={i}>{beer} <span onClick={() => this.updateBeer()}><i className="fa fa-pencil"></i></span></h3>
            } else if(this.state.beers.length === 1){
                return <h3 key={i}>{beer}</h3>
            }
        });
        return (
            <div>
                <InputBox value={this.state.userInput} className="input" onChange={e => this.updateInput(e.target.value)} />
                <PourButton click={() => this.addBeer()}/>
                {list}
            </div>
        )
    }

}

export default BeerList;
