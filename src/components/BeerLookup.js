import React, {Component} from 'react';
import axios from 'axios';
import InputBox from './InputBox';
import DisplayResults from './DisplayResults';

class BeerLookup extends Component {
    constructor(){
        super();
        this.state = {
            userInput: '',
            name: '',
            description: '',
            abv: '',
            image: '',
            brewery: '',
            website: '',
            icon: '',
        };
    }

    updateInput(val){
        this.setState({ userInput: val })
    }

    getBeer(e){
        e.preventDefault();
        console.log('click');
        axios.get(`http://localhost:3535/api/beer/${this.state.userInput}`)
        .then(response => {
            console.log('promise returned');
            if(response.data.hasOwnProperty('data')){
                let {name, description, abv, labels, breweries} = response.data.data[0];
                this.setState({
                    userInput: '',
                    name: name,
                    description: description,
                    abv: abv + ' abv',
                    image: labels.medium,
                    brewery: breweries[0].name,
                    website: breweries[0].website
                })
            } else {
                this.setState({
                    name: 'Beer not found',
                    description: '',
                    abv: '',
                    image: '',
                    brewery: '',
                    website: ''
                })
            }

        }).catch(err => console.log('Error: ' + err));
    }

    render(){

        return (
            <div>
                <form>
                    <InputBox
                        class="InputBox beerLookupBox"
                        placeholder="Beer Name"
                        value={this.state.userInput}
                        onChange={e => this.updateInput(e.target.value)} />

                    <button className="searchBtn" onClick={(e) => this.getBeer(e)}><i className="fa fa-search"></i></button>
                </form>

                <DisplayResults
                    name={this.state.name}
                    abv={this.state.abv}
                    brewery={this.state.brewery}
                    website={this.state.website}
                    description={this.state.description}
                    image={this.state.image} />

            </div>
        )
    }
}

export default BeerLookup
