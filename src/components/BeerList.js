import React, {Component} from 'react';
import axios from 'axios';
import InputBox from './InputBox';
import PourButton from './PourButton';
import TextBox from './TextBox';

class BeerList extends Component {
    constructor(){
        super();
        this.state = {
            beerId: '',
            beerName: '',
            beerRating: '5',
            beerNotes: '',
            beers: [],
            update: false
        }
    }

    componentDidMount(){
        axios.get( `http://localhost:3535/api/mybeers` )
        .then( response => { this.setState({ beers: response.data }) }).catch(err => console.log('Error: ' + err));
    }

    updateInput(val){
        this.setState({ beerName: val })
    }
    updateRating(val){
        this.setState({ beerRating: val })
    }
    updateNotes(val){
        this.setState({ beerNotes: val })
    }

    addBeer(){
        let body = {
            id: this.state.beerId,
            name: this.state.beerName,
            rating: this.state.beerRating,
            notes: this.state.beerNotes
        };
        if(this.state.update){
            axios.put( `http://localhost:3535/api/mybeers/:id`, body)
            .then( response => {
                this.setState({
                beers: response.data,
                beerId: '',
                beerName: '',
                beerRating: '',
                beerNotes: '',
                update: false
            })
            }).catch(err => console.log('Error: ' + err));
        } else {
            axios.post( `http://localhost:3535/api/mybeers`, body)
            .then( response => {
                this.setState({
                beers: response.data,
                beerId: '',
                beerName: '',
                beerRating: '',
                beerNotes: '',
                update: false
            })
            }).catch(err => console.log('Error: ' + err));
        }
    }

    updateBeer(id, name,rating,notes){
        this.setState({
            beerId: id,
            beerName: name,
            beerRating: rating,
            beerNotes: notes,
            update: true
        })
    }

    render(){
        let list = this.state.beers.map((beer,i) => {
            if(this.state.beers.length > 1 && i > 0){
                return (
                    <div key={i}>
                        <h3>
                            {beer.name} <i className="fa fa-star"></i> {beer.rating}
                            <span onClick={() => this.updateBeer(beer.id, beer.name, beer.rating, beer.notes)}> <i className="fa fa-pencil"></i></span>
                        </h3>
                        <h5 className="text-left">Notes: <span className="light">{beer.notes}</span></h5>
                    </div>
                )
            } else if(this.state.beers.length === 1){
                return <h3 key={i}>{beer.name}</h3>
            } else {
                return '';
            }
        });
        return (
            <div>
                <InputBox placeholder="Beer Name" val={this.state.beerName} className="input" onChange={e => this.updateInput(e.target.value)} />
                <br/>
                <TextBox onChange={e => this.updateNotes(e.target.value)} placeholder="Notes about this beer...." className="Textarea" val={this.state.beerNotes} />
                <br/>
                <input type="range" max="5" min="1" onChange={e => this.updateRating(e.target.value)} /><br/>
                <i className="fa fa-star"></i> &nbsp;
                <i className="fa fa-star"></i> &nbsp;
                <i className="fa fa-star"></i> &nbsp;
                <i className="fa fa-star"></i> &nbsp;
                <i className="fa fa-star"></i>
                <br/><br/>
                <PourButton click={() => this.addBeer()} />
                {list}
            </div>
        )
    }

}

export default BeerList;
