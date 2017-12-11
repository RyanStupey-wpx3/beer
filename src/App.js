import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Logo from './components/Logo';
import InputBox from './components/InputBox';
import DisplayResults from './components/DisplayResults';
import TextBox from './components/TextBox';
import Rating from './components/Rating';
import PourButton from './components/PourButton';
import SearchButton from './components/SearchButton';

class App extends Component {

    constructor(){
        super();
        this.state = {
            searchInput: '',
            id: '',
            name: '',
            userName: '',
            userRating: '1',
            userNotes: '',
            description: '',
            abv: '',
            image: '',
            brewery: '',
            website: '',
            icon: '',
            beerList: [],
            update: false
        }
    }

    componentDidMount(){
        axios.get( `http://localhost:3535/api/mybeers` )
        .then( response => { this.setState({ beerList: response.data }) })
        .catch(err => console.log('Error: ' + err));
    }

    //Store search input
    updateInput(val){
        this.setState({ searchInput: val })
    }

    //Get beer from BreweryDB
    getBeer(e){
        e.preventDefault();
        axios.get(`http://localhost:3535/api/beer/${this.state.searchInput}`)
        .then(response => {
            //Check for return data
            if(response.data.hasOwnProperty('data')){
                let {name, description, abv, labels, breweries} = response.data.data[0];
                this.setState({
                    searchInput: '',
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

    //Update state on user input
    updateName(val){
        this.setState({ userName: val })
    }
    updateRating(val){
        this.setState({ userRating: val })
    }
    updateNotes(val){
        this.setState({ userNotes: val })
    }

    //Update Beer List
    addBeer(){
        let body = {
            id: this.state.id,
            name: this.state.userName,
            rating: this.state.userRating,
            notes: this.state.userNotes
        };

        //Update existing beer
        if(this.state.update){
            axios.put( `http://localhost:3535/api/mybeers/:id`, body)
            .then( response => {
                this.setState({
                    beerList: response.data,
                    id: '',
                    userName: '',
                    userRating: '1',
                    userNotes: '',
                    update: false
                })
            }).catch(err => console.log('Error: ' + err));
        } else {
            //Add new beer (Name must exist)
            if(this.state.userName){
                axios.post( `http://localhost:3535/api/mybeers`, body)
                .then( response => {
                    this.setState({
                        beerList: response.data,
                        id: '',
                        userName: '',
                        userRating: '1',
                        userNotes: '',
                        update: false
                    })
                }).catch(err => console.log('Error: ' + err));
            }
        }
    }

    //Load existing stats into state to prefill for edit
    updateBeer(id, name,rating,notes){
        this.setState({
            id: id,
            userName: name,
            userRating: rating,
            userNotes: notes,
            update: true
        })
    }

    render() {

        //Prepare beer entries for display
        let list = this.state.beerList.map((beer,i) => {
            //If more than default 'Add beer to your list' entry, return each entry that is not the 'add' message
            if(this.state.beerList.length > 1 && i > 0){
                return (
                    <div key={i}>
                        <h2>
                            <span className="beerName">{beer.name}</span> <i className="fa fa-star yellow"></i> {beer.rating}
                            <span onClick={() => this.updateBeer(beer.id, beer.name, beer.rating, beer.notes)}> <i className="fa fa-pencil"></i></span>
                        </h2>
                        <span className="label">Notes: </span><br/>
                        <h5 className="beer-notes">{beer.notes}</h5>
                    </div>
                )
            } else if(this.state.beerList.length === 1){
                //If only default msg exists, display msg
                return <h3 key={i}>{beer}</h3>
            } else {
                //Else present for msg skip when entries are present
                return '';
            }
        });

        return (
            <div className="App">
                <header className="App-header">
                    <Logo />
                </header>
                <div className="wrapper">
                    <div className="userList">
                        <h1>My Beers</h1>
                        <InputBox
                            class="InputBox"
                            placeholder="Beer Name"
                            val={this.state.userName}
                            onChange={e => this.updateName(e.target.value)} />
                        <br/>

                        <TextBox
                            onChange={e => this.updateNotes(e.target.value)}
                            placeholder="Notes about this beer...."
                            val={this.state.userNotes} />

                        <div className="rating-wrapper">
                            <Rating change={e => this.updateRating(e.target.value)} val={this.state.userRating} />
                            <PourButton click={() => this.addBeer()} />
                        </div>
                        <div className="beer-list">
                            {list}
                        </div>
                    </div>
                    <div className="beerLookup">
                        <h1>Beer Lookup</h1>
                        <form>
                            <InputBox
                                class="InputBox beerLookupBox"
                                placeholder="Beer Name"
                                value={this.state.searchInput}
                                onChange={e => this.updateInput(e.target.value)} />

                            <SearchButton
                                click={(e) => this.getBeer(e)} />
                        </form>
                        <DisplayResults
                            name={this.state.name}
                            abv={this.state.abv}
                            brewery={this.state.brewery}
                            website={this.state.website}
                            description={this.state.description}
                            image={this.state.image} />
                    </div>
                </div>
                <footer>
                    <Logo />
                </footer>
            </div>
        );
    }
}

export default App;
