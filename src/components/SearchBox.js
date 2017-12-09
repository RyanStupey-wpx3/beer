import React, {Component} from 'react';
import axios from 'axios';

class SearchBox extends Component {
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

    getBeer(){

        axios.get(`http://localhost:3535/api/beer/${this.state.userInput}`).then(response => {
            let {name, description, abv, labels, breweries} = response.data.data[0];

            console.log(breweries);

            this.setState({
                userInput: '',
                name: name,
                description: description,
                abv: abv,
                image: labels.medium,
                brewery: breweries[0].name,
                website: breweries[0].website
            })
        }).catch(console.log);
    }

    render(){
        return (
            <div className="SearchBox">
                <input value={this.state.userInput} className="input" onChange={e => this.updateInput(e.target.value)}/>
                <button onClick={() => this.getBeer()}>Pour</button>

                <div className="displayResults">
                    <h2>{this.state.name} <small>{this.state.abv}</small></h2>
                    <h4><a href={this.state.website}>{this.state.brewery}</a></h4>
                    <p>{this.state.description}</p>
                    <img alt="" src={this.state.image} className="beerLabel" />
                </div>


            </div>
        )
    }
}

export default SearchBox