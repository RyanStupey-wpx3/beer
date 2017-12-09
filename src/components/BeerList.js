import React, {Component} from 'react';
import axios from 'axios';
import InputBox from './InputBox';
import PourButton from './PourButton';
import TextBox from './TextBox';
import Rating from './Rating';

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

    // Initial load of beer list
    componentDidMount(){
        axios.get( `http://localhost:3535/api/mybeers` )
        .then( response => { this.setState({ beers: response.data }) })
        .catch(err => console.log('Error: ' + err));
    }

    //Update state on user input
    updateInput(val){
        this.setState({ beerName: val })
    }
    updateRating(val){
        this.setState({ beerRating: val })
    }
    updateNotes(val){
        this.setState({ beerNotes: val })
    }

    //Update Beer List
    addBeer(){
        let body = {
            id: this.state.beerId,
            name: this.state.beerName,
            rating: this.state.beerRating,
            notes: this.state.beerNotes
        };

        //Update existing beer
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
            //Add new beer (Name must exist)
            if(this.state.beerName){
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
    }

    //Load existing stats into state to prefill for edit
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
        //Prepare beer entries for display
        let list = this.state.beers.map((beer,i) => {
            //If more than default 'Add beer to your list' entry, return each entry that is not the 'add' message
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
                //If only default msg exists, display msg
                return <h3 key={i}>{beer.name}</h3>
            } else {
                //Else present for msg skip when entries are present
                return '';
            }
        });

        return (
            <div>
                <InputBox
                    className="input"
                    placeholder="Beer Name"
                    val={this.state.beerName}
                    onChange={e => this.updateInput(e.target.value)} />
                <br/>

                <TextBox
                    onChange={e => this.updateNotes(e.target.value)}
                    placeholder="Notes about this beer...."
                    val={this.state.beerNotes} />
                <br/>

                <Rating change={e => this.updateRating(e.target.value)} />
                <br/><br/>

                <PourButton click={() => this.addBeer()} />
                {list}
            </div>
        )
    }

}

export default BeerList;
